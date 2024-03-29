import {
  Container,
  FormContainer,
  InputsContainer,
  RegisterYourTeamContainer,
  CheckoutFormContainer,
} from "../../styles/consulta-styles";
import { SubHeader } from "../../components/SubHeader";
import Head from "next/head";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button/styles";
import { FaPlus, FaTrash } from "react-icons/fa";
import type { GetServerSideProps } from "next";
import { ListPokemonsUseCase } from "../../@core/application/pokemon/list-pokemons.use-case";
import { container, Registry } from "../../@core/infra/container-registry";
import { ListRegionsUseCase } from "../../@core/application/region/list-regions.use-case";
import { ChangeEvent, useEffect, useState } from "react";
import { ListDatesUseCase } from "../../@core/application/date/list-dates.use-case";
import { ListTimesUseCase } from "../../@core/application/time/list-times.use-case";
import { ListCitiesUseCase } from "../../@core/application/city/list-cities.use-case";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Error } from "../../components/Error";
import { IConsultaProps } from "../../interfaces/pages";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PostScheduleUseCase } from "../../@core/application/schedule/post-schedule.use-case";
import Router from "next/router";
import formatCityName from "../../utils/city-name-formatter";
import formatPokemonsOptions from "../../utils/pokemons-options-formatter";
import formatRegionsOptions from "../../utils/regions-options-formatter";
import { PokemonProps } from "../../@core/domain/entities/pokemon";

const schema = yup
  .object({
    name: yup.string().required(),
    surname: yup.string().required(),
    region: yup.string().required(),
    city: yup.string().required(),
    pokemonsValues: yup.array<{ name: string }>().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    quantity: yup.number().positive().integer().required(),
    tax: yup.number().required(),
    price: yup.number().required(),
  })
  .required();

function Consulta({ pokemons, regions, fetchDataError }: IConsultaProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [pokemonsOptions, setPokemonsOptions] = useState<PokemonProps[] | []>(
    []
  );
  const [regionsOptions, setRegionsOptions] = useState<string[]>([]);

  // Responsável por obter as datas e horários disponíveis ao inicializar
  useEffect(() => {
    const useCaseListDates = container.get<ListDatesUseCase>(
      Registry.ListDatesUseCase
    );
    const useCaseListTimes = container.get<ListTimesUseCase>(
      Registry.ListTimesUseCase
    );

    const fetchData = async () => {
      const [dates, times] = await Promise.all([
        useCaseListDates.execute(),
        useCaseListTimes.execute(),
      ]);

      setAvailableDates(dates);
      setAvailableTimes(times);
    };

    fetchData().catch((err) => {
      console.error("Erro ao carregar datas para atendimento:", err);

      toast.error(
        "Ops! Encontramos um problema ao carregar opções de data e horário para atendimento. Parece que há um pequeno contratempo com nossos servidores. Tente novamente.",
        {
          toastId: "error-get-schedules",
          position: "top-right",
          theme: "dark",
        }
      );
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: {
      errors,
      isSubmitted,
      isValid,
      isSubmitSuccessful,
      submitCount,
    },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      region: "",
      city: "",
      pokemonsValues: [{ name: "Bulbasaur", generation: 1 }],
      date: "",
      time: "",
      quantity: 1,
      price: 0,
      tax: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pokemonsValues",
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    if (isValid) {
      processSubmitForm(data);
    }
  };

  const pokemonsValuesWatch = watch("pokemonsValues");

  // Responsável por atualizar os valores da sessão de chack-out do formulário
  useEffect(() => {
    const values = getValues();

    const quantityValue = values.pokemonsValues.length;
    setValue("quantity", quantityValue);

    const subTotal = quantityValue * 70;
    const maxTaxValue = subTotal * 0.3;

    const highestGen = Math.max(
      ...values.pokemonsValues.map((pokemon) => pokemon.generation)
    );

    // Garante que taxValue não ultrapasse 30% do subTotal
    const taxValue = Math.min(subTotal * 0.03 * highestGen, maxTaxValue);
    setValue("tax", taxValue);

    const priceValue = subTotal + taxValue;
    setValue("price", priceValue);
  }, [setValue, getValues, pokemonsValuesWatch]);

  // Exibe notificação tipo toast caso formulário enviado não esteja válido
  useEffect(() => {
    if (!isValid && isSubmitted && !isSubmitSuccessful) {
      toast.error("Preencha todos os campos obrigatórios para o agendamento.", {
        toastId: "error-invalid-form",
        position: "top-right",
        theme: "dark",
      });
    }
  }, [isValid, isSubmitted, isSubmitSuccessful, submitCount]);

  const priceValue: number = watch("price");
  const taxValue: number = watch("tax");
  const quantityValue: number = watch("quantity");

  useEffect(() => {
    const formatedPokemonsOptions = formatPokemonsOptions(pokemons);
    setPokemonsOptions(formatedPokemonsOptions);

    const formatedRegionsOptions = formatRegionsOptions(regions);
    setRegionsOptions(formatedRegionsOptions);
  }, [pokemons, regions]);

  // Renderização condicional do componente Error em caso de erro ao buscar dados da API
  if (fetchDataError) {
    return <Error error={fetchDataError} />;
  }

  const handleRegionChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) {
      setCities([]);
      return;
    }

    let selectedValue: string =
      event.target.value.charAt(0).toLowerCase() +
      event.target.value.slice(1).toLowerCase();
    selectedValue = selectedValue.replaceAll(" ", "-");

    const useCaseListCities = container.get<ListCitiesUseCase>(
      Registry.ListCitiesUseCase
    );

    const data = await useCaseListCities.execute(selectedValue).catch((err) => {
      console.error("Erro ao carregar cidades:", err);

      toast.error(
        "Ops! Encontramos um problema ao carregar opções de cidades para sua região. Parece que há um pequeno contratempo com nossos servidores. Tente novamente.",
        {
          toastId: "error-get-cities",
          position: "top-right",
          theme: "dark",
        }
      );
    });

    // Verifica se a lista de cidades foi obtida
    if (!data) {
      return;
    }

    // Removendo cidades duplicadas usando um Set (coleção de valores únicos)
    const uniqueCities = new Set<string>(
      data
        .map((location: { name: string }) => location.name)
        .map((formattedCityName: string) => formatCityName(formattedCityName))
    );

    const uniqueCitiesArray: string[] = Array.from(uniqueCities);

    setCities(uniqueCitiesArray);
  };

  const processSubmitForm = async (formData: object) => {
    let resp: any;

    try {
      const useCasePostSchedule = container.get<PostScheduleUseCase>(
        Registry.PostScheduleUseCase
      );

      resp = await useCasePostSchedule.execute(formData);

      if (resp.success) {
        Router.push({
          pathname: "/consulta/feedback",
          query: {
            status: "success",
            title: "Consulta Agendada",
            description: resp.message.toString(),
            id: resp.data.id,
          },
        });
      }
    } catch (err: any) {
      console.error("Erro ao enviar formulário:", err);

      resp = err.response.data;

      Router.push({
        pathname: "/consulta/feedback",
        query: {
          status: "error",
          title: "Houve um problema no agendamento",
          description: resp.message.toString(),
        },
      });
    } finally {
      reset();
    }
  };

  return (
    <>
      <Head>
        <title>Centro Pokémon - Consultas</title>
      </Head>
      <Container>
        <SubHeader
          description="Recupere seus pokémons em 5 segundos."
          page="Agendar Consulta"
        />
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <h1>Preencha o formulário abaixo para agendar sua consulta</h1>
          <InputsContainer>
            <Input
              idInput="name"
              typeInput="text"
              placeholder="Digite seu nome"
              labelText="Nome"
              {...register("name")}
              isRequired={true}
            />
            <Input
              idInput="surname"
              typeInput="text"
              placeholder="Digite seu sobrenome"
              labelText="Sobrenome"
              {...register("surname")}
              isRequired={true}
            />
          </InputsContainer>
          <InputsContainer>
            <Select
              idSelect="region"
              labelText="Região"
              $isSelectPokemon={false}
              options={regionsOptions}
              placeholder="Selecione uma região"
              {...register("region")}
              onChange={handleRegionChange}
              isRequired={true}
            />
            <Select
              idSelect="city"
              labelText="Cidade"
              $isSelectPokemon={false}
              options={cities}
              placeholder="Selecione uma cidade"
              disabled={!cities.length}
              {...register("city")}
              isRequired={true}
            />
          </InputsContainer>
          <RegisterYourTeamContainer>
            <div className="registerYourTeamSessionHeader">
              <h2>Cadastre seu time</h2>
              <span>Atendemos até 06 pokémons por vez</span>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="registerYourTeamSessionPokemons">
                <Select
                  labelText={`Pokémon ${index + 1}`}
                  $isSelectPokemon={true}
                  options={pokemonsOptions}
                  {...register(`pokemonsValues.${index}.name`)}
                  key={field.id}
                  isRequired={index == 0}
                />
                {index > 0 && <FaTrash onClick={() => remove(index)} />}
              </div>
            ))}
            <Button
              $isAddPokemon={true}
              disabled={fields.length == 6}
              onClick={() => {
                event?.preventDefault();
                append(control._defaultValues.pokemonsValues); // Inicia o select com o valor default definido
              }}
            >
              Adicionar novo pokémon ao time...
              <FaPlus size={10} />
            </Button>
          </RegisterYourTeamContainer>
          <InputsContainer>
            <Select
              idSelect="date"
              labelText="Data para atendimento"
              $isSelectPokemon={false}
              options={availableDates}
              placeholder="Selecione uma data"
              {...register("date")}
              disabled={!availableDates}
              isRequired={true}
            />
            <Select
              idSelect="time"
              labelText="Horário de atendimento"
              $isSelectPokemon={false}
              options={availableTimes}
              placeholder="Selecione um horário"
              {...register("time")}
              disabled={!availableTimes}
              isRequired={true}
            />
          </InputsContainer>
          <hr />
          <CheckoutFormContainer>
            <div>
              <span>Número de pokémons a serem atendidos:</span>
              <span>{quantityValue}</span>
            </div>
            <div>
              <span>Atendimento unitário por pokémon:</span>
              <span>R$ 70,00</span>
            </div>
            <div>
              <span>Subtotal:</span>
              <span>
                R${" "}
                {(quantityValue * 70).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div>
              <span>Taxa geracional*:</span>
              <span>
                R${" "}
                {taxValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div>
              <span className="observation">
                *adicionamos uma taxa de 3%, multiplicado pelo número da geração
                mais alta do time, com limite de até 30%
              </span>
            </div>
            <section className="submitSection">
              <span>
                Valor Total:{" "}
                {priceValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <Button $isAddPokemon={false} disabled={false} type="submit">
                Concluir Agendamento
              </Button>
            </section>
          </CheckoutFormContainer>
        </FormContainer>
      </Container>
    </>
  );
}

export default Consulta;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const useCaseListPokemons = container.get<ListPokemonsUseCase>(
      Registry.ListPokemonsUseCase
    );
    const useCaseListRegions = container.get<ListRegionsUseCase>(
      Registry.ListRegionsUseCase
    );

    const [pokemons, regions] = await Promise.all([
      useCaseListPokemons.execute(),
      useCaseListRegions.execute(),
    ]);

    return {
      props: {
        pokemons: pokemons.map((pokemon) => pokemon.toJSON()),
        regions: regions.map((region) => region.toJSON()),
      },
    };
  } catch (error) {
    console.error("Erro ao carregar dados:", error);

    return {
      props: {
        fetchDataError: true,
      },
    };
  }
};

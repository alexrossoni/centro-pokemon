import {
  Container,
  FormContainer,
  InputsContainer,
  RegisterYourTeamContainer,
  CheckinFormContainer,
} from "./styles";
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

const schema = yup
  .object({
    name: yup.string().required(),
    surname: yup.string().required(),
    region: yup.string().required(),
    city: yup.string().required(),
    pokemonsValues: yup.array<{ name: string }>().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    quantity: yup.number().positive().integer(),
    tax: yup.number(),
    price: yup.number(),
  })
  .required();

function Consulta({ pokemons, regions, error }: IConsultaProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Obtendo datas e horários disponíveis ao inicializar
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      region: "",
      city: "",
      pokemonsValues: [{ name: "Bulbasaur" }],
      date: "",
      time: "",
    },
  });

  const pokemonsValuesWatch = watch("pokemonsValues");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pokemonsValues",
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    const values = getValues();

    const quantityValue = values.pokemonsValues.length;
    setValue("quantity", quantityValue);

    const subTotal = quantityValue * 70;
    const maxTaxValue = subTotal * 0.3;

    // const highestGen = Math.max(...values.pokemonsValues.map((pokemon) => pokemon.gen));
    const highestGen = 1;
    // Garante que taxValue não ultrapasse 30% do subTotal
    const taxValue = Math.min(subTotal * 0.03 * highestGen, maxTaxValue);
    setValue("tax", taxValue);

    const priceValue = subTotal + taxValue;
    setValue("price", priceValue);
  }, [setValue, getValues, pokemonsValuesWatch]);

  // Renderização condicional do componente Error em caso de erro ao buscar dados da API
  if (error) {
    return <Error error={error} />;
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

  // Função para formatar o nome das cidades
  const formatCityName = (cityName: string): string => {
    const formattedName = cityName
      .replaceAll("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return formattedName;
  };

  const pokemonsNames: { name: string }[] = pokemons.map(({ name }) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
  }));

  const regionsNames: string[] = regions.map(
    (item) =>
      item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()
  );

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
              required
            />
            <Input
              idInput="surname"
              typeInput="text"
              placeholder="Digite seu sobrenome"
              labelText="Sobrenome"
              {...register("surname")}
              required
            />
          </InputsContainer>
          <InputsContainer>
            <Select
              idSelect="region"
              labelText="Região"
              $isSelectPokemon={false}
              options={regionsNames}
              placeholder="Selecione uma região"
              {...register("region")}
              onChange={handleRegionChange}
              required
            />
            <Select
              idSelect="city"
              labelText="Cidade"
              $isSelectPokemon={false}
              options={cities}
              disabled={!cities.length}
              {...register("city")}
              required
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
                  options={pokemonsNames}
                  {...register(`pokemonsValues.${index}.name`)}
                  key={field.id}
                  required={index == 0}
                />
                {index > 0 && <FaTrash onClick={() => remove(index)} />}
              </div>
            ))}
            <Button
              $isAddPokemon={true}
              disabled={fields.length == 6}
              onClick={() => {
                event?.preventDefault();
                append({ name: "Bulbasaur" });
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
              required
            />
            <Select
              idSelect="time"
              labelText="Horário de atendimento"
              $isSelectPokemon={false}
              options={availableTimes}
              placeholder="Selecione um horário"
              {...register("time")}
              disabled={!availableTimes}
              required
            />
          </InputsContainer>
          <hr />
          <CheckinFormContainer>
            <div>
              <span>Número de pokémons a serem atendidos:</span>
              <span>{fields.length}</span>
            </div>
            <div>
              <span>Atendimento unitário por pokémon:</span>
              <span>R$ 70,00</span>
            </div>
            <div>
              <span>Subtotal:</span>
              <span>
                R${" "}
                {(fields.length * 70).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div>
              <span>Taxa geracional*:</span>
              <span>
                R${" "}
                {(fields.length * 70 * 0.03).toLocaleString("pt-BR", {
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
                {(
                  fields.length * 70 +
                  fields.length * 70 * 0.03
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <Button $isAddPokemon={false} disabled={false} type="submit">
                Concluir Agendamento
              </Button>
            </section>
          </CheckinFormContainer>
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
        error: true,
      },
    };
  }
};

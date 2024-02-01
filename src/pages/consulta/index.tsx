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
import { PokemonProps } from "../../@core/domain/entities/pokemon";
import { ListRegionsUseCase } from "../../@core/application/region/list-regions.use-case";
import { RegionProps } from "../../@core/domain/entities/region";
import { ChangeEvent, useEffect, useState } from "react";
import { ListDatesUseCase } from "../../@core/application/date/list-dates.use-case";
import { ListTimesUseCase } from "../../@core/application/time/list-times.use-case";
import { ListCitiesUseCase } from "../../@core/application/city/list-cities.use-case";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type ConsultaProps = {
  pokemons: PokemonProps[];
  regions: RegionProps[];
};

function Consulta({ pokemons, regions }: ConsultaProps) {
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

    fetchData();
  }, []);

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

    const data = await useCaseListCities.execute(selectedValue);

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      region: "",
      city: "",
      date: "",
      time: "",
      pokemonsValues: [{ name: "Bulbasaur" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pokemonsValues",
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
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
            />
            <Input
              idInput="surname"
              typeInput="text"
              placeholder="Digite seu sobrenome"
              labelText="Sobrenome"
              {...register("surname")}
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
            />
            <Select
              idSelect="city"
              labelText="Cidade"
              $isSelectPokemon={false}
              options={cities}
              disabled={!cities.length}
              {...register("city")}
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
            />
            <Select
              idSelect="time"
              labelText="Horário de atendimento"
              $isSelectPokemon={false}
              options={availableTimes}
              placeholder="Selecione um horário"
              {...register("time")}
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
};

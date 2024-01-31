import {
  Container,
  FormContainer,
  InputsContainer,
  RegisterYourTeamContainer,
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

type ConsultaProps = {
  pokemons: PokemonProps[];
  regions: RegionProps[];
};

function Consulta({ pokemons, regions }: ConsultaProps) {
  const [selectsPokemons, setSelectsPokemons] = useState<{ id: number }[]>([
    { id: 1 },
  ]); // Inicializando com um select de pokémons
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const addPokemonSelect = () => {
    event?.preventDefault();
    if (selectsPokemons.length < 6) {
      setSelectsPokemons((prevPokemons) => [
        ...prevPokemons,
        { id: Date.now() },
      ]);
    }
  };

  const removePokemonSelect = (id: number) => {
    event?.preventDefault();
    setSelectsPokemons((prevPokemons) =>
      prevPokemons.length > 1
        ? prevPokemons.filter((pokemon) => pokemon.id !== id)
        : [{ id: 1 }]
    );
  };

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

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/region/${selectedValue}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter cidades da região");
      }

      const data = await response.json();

      // Removendo cidades duplicadas usando um Set (coleção de valores únicos)
      const uniqueCities = new Set<string>(
        data.locations
          .map((location: { name: string }) => location.name)
          .map((formattedCityName: string) => formatCityName(formattedCityName))
      );

      const uniqueCitiesArray: string[] = Array.from(uniqueCities);

      setCities(uniqueCitiesArray);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para formatar o nome da cidade
  const formatCityName = (cityName: string): string => {
    const formattedName = cityName
      .replaceAll("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return formattedName;
  };

  const pokemonsNames: string[] = pokemons.map(
    (item) =>
      item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()
  );

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
        <FormContainer>
          <h1>Preencha o formulário abaixo para agendar sua consulta</h1>
          <InputsContainer>
            <Input
              idInput="name"
              typeInput="text"
              placeholder="Digite seu nome"
              labelText="Nome"
            />
            <Input
              idInput="surname"
              typeInput="text"
              placeholder="Digite seu sobrenome"
              labelText="Sobrenome"
            />
          </InputsContainer>
          <InputsContainer>
            <Select
              idSelect="region"
              labelText="Região"
              $isSelectPokemon={false}
              options={regionsNames}
              onChange={handleRegionChange}
              placeholder="Selecione uma região"
            />
            <Select
              idSelect="city"
              labelText="Cidade"
              $isSelectPokemon={false}
              options={cities}
              disabled={!cities.length}
            />
          </InputsContainer>
          <RegisterYourTeamContainer>
            <div className="registerYourTeamSessionHeader">
              <h2>Cadastre seu time</h2>
              <span>Atendemos até 06 pokémons por vez</span>
            </div>
            {selectsPokemons.map((select, index) => (
              <div key={select.id} className="registerYourTeamSessionPokemons">
                <Select
                  idSelect={`pokemon${select.id}`}
                  labelText={`Pokémon ${index + 1}`}
                  $isSelectPokemon={true}
                  options={pokemonsNames}
                />
                {index > 0 && (
                  <FaTrash onClick={() => removePokemonSelect(select.id)} />
                )}
              </div>
            ))}
            <Button
              $isAddPokemon={true}
              disabled={selectsPokemons.length == 6}
              onClick={addPokemonSelect}
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
            />
            <Select
              idSelect="time"
              labelText="Horário de atendimento"
              $isSelectPokemon={false}
              options={availableTimes}
              placeholder="Selecione um horário"
            />
          </InputsContainer>
          <Button $isAddPokemon={false} disabled={false} type="submit">
            Concluir Agendamento
          </Button>
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

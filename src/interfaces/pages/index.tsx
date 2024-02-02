import { PokemonProps } from "../../@core/domain/entities/pokemon";
import { RegionProps } from "../../@core/domain/entities/region";

export interface IConsultaProps {
  pokemons: PokemonProps[];
  regions: RegionProps[];
  fetchDataError: boolean;
}

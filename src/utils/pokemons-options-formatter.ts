import { PokemonProps } from "../@core/domain/entities/pokemon";

// Função para formatar as opções de pokémons
const formatPokemonsOptions = (
  pokemons: PokemonProps[]
): { name: string; generation: number }[] => {
  return pokemons.map(({ name, generation }) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    generation: generation as number,
  }));
};

export default formatPokemonsOptions;

import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonGateway } from "../../domain/gateways/pokemon.gateway";

export class ListPokemonsUseCase {
  constructor(private pokemonGate: PokemonGateway) {}

  async execute(): Promise<Pokemon[]> {
    return this.pokemonGate.findAll();
  }
}

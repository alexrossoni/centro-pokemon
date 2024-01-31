import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonGateway } from "../../domain/gateways/pokemon.gateway";

//Dependency Inversion
export class GetPokemonUseCase {
  constructor(private pokemonGate: PokemonGateway) {}

  execute(name: string): Promise<Pokemon> {
    return this.pokemonGate.findByName(name);
  }
}

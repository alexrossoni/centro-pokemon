import { Pokemon } from "../entities/pokemon";

export interface PokemonGateway {
  findAll(): Promise<Pokemon[]>;
  findByName(name: string): Promise<Pokemon>;
}

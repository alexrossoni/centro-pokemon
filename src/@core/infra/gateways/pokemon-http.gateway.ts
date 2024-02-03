import { AxiosInstance } from "axios";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonGateway } from "../../domain/gateways/pokemon.gateway";

export class PokemonHttpGateway implements PokemonGateway {
  constructor(private http: AxiosInstance) {}

  // Responsável por carregar os dados de cada pokémon junto a sua geração
  async fetchPokemonData(pokemonName: string): Promise<Pokemon> {
    return this.http
      .get(`/pokemon-species/${pokemonName}`)
      .then((pokemonData) => {
        // Obtendo a geração do pokémon atravpes da URL da geração
        const generation = pokemonData.data.generation.url
          .split("generation/")[1]
          .replaceAll("/", "");

        return new Pokemon({
          name: pokemonData.data.name,
          generation: parseInt(generation),
        });
      });
  }

  async findAll(): Promise<Pokemon[]> {
    const response = await this.http.get("/pokemon?limit=50&offset=0");
    const pokemonList = response.data.results;

    const pokemonDataPromises = pokemonList.map((pokemon: Pokemon) => {
      return this.fetchPokemonData(pokemon.name);
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    return pokemonData;
  }

  async findByName(name: string): Promise<Pokemon> {
    return this.http.get<Pokemon>(`/pokemon/${name}`).then((res) => {
      return new Pokemon({
        name: res.data.name,
        url: res.data.url,
      });
    });
  }
}

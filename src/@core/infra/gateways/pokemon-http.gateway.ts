import { AxiosInstance } from "axios";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonGateway } from "../../domain/gateways/pokemon.gateway";

export class PokemonHttpGateway implements PokemonGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Pokemon[]> {
    return this.http.get<any>("/pokemon?limit=50&offset=0").then((res) => {
      return res.data.results.map(
        (data: any) =>
          new Pokemon({
            name: data.name,
            url: data.url,
          })
      );
    });
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

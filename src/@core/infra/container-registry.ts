import { Container } from "inversify";
import { GetPokemonUseCase } from "../application/pokemon/get-pokemon.use-case";
import { ListPokemonsUseCase } from "../application/pokemon/list-pokemons.use-case";
import { PokemonHttpGateway } from "./gateways/pokemon-http.gateway";
import { http } from "./http";
import { RegionHttpGateway } from "./gateways/region-http.gateway";
import { ListRegionsUseCase } from "../application/region/list-regions.use-case";

export const Registry = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),

  PokemonGateway: Symbol.for("PokemonGateway"),
  RegionGateway: Symbol.for("RegionGateway"),

  ListPokemonsUseCase: Symbol.for("ListPokemonsUseCase"),
  GetPokemonUseCase: Symbol.for("GetPokemonUseCase"),
  ListRegionsUseCase: Symbol.for("ListRegionsUseCase"),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);

//########## GATEWAYS
container.bind(Registry.PokemonGateway).toDynamicValue((context) => {
  return new PokemonHttpGateway(context.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.RegionGateway).toDynamicValue((context) => {
  return new RegionHttpGateway(context.container.get(Registry.AxiosAdapter));
});

//########## USE CASES
container.bind(Registry.ListPokemonsUseCase).toDynamicValue((context) => {
  return new ListPokemonsUseCase(
    context.container.get(Registry.PokemonGateway)
  );
});
container.bind(Registry.GetPokemonUseCase).toDynamicValue((context) => {
  return new GetPokemonUseCase(context.container.get(Registry.PokemonGateway));
});
container.bind(Registry.ListRegionsUseCase).toDynamicValue((context) => {
  return new ListRegionsUseCase(context.container.get(Registry.RegionGateway));
});

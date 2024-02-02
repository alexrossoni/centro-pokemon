import { Container } from "inversify";
import { GetPokemonUseCase } from "../application/pokemon/get-pokemon.use-case";
import { ListPokemonsUseCase } from "../application/pokemon/list-pokemons.use-case";
import { PokemonHttpGateway } from "./gateways/pokemon-http.gateway";
import { http, scheduling } from "./http";
import { RegionHttpGateway } from "./gateways/region-http.gateway";
import { ListRegionsUseCase } from "../application/region/list-regions.use-case";
import { DateHttpGateway } from "./gateways/date-http.gateway";
import { ListDatesUseCase } from "../application/date/list-dates.use-case";
import { TimeHttpGateway } from "./gateways/time-http.gateway";
import { ListTimesUseCase } from "../application/time/list-times.use-case";
import { CityHttpGateway } from "./gateways/city-http.gateway";
import { ListCitiesUseCase } from "../application/city/list-cities.use-case";
import { ScheduleHttpGateway } from "./gateways/schedule-http.gateway";
import { PostScheduleUseCase } from "../application/schedule/post-schedule.use-case";

export const Registry = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  AxiosAdapterScheduling: Symbol.for("AxiosAdapterScheduling"),

  PokemonGateway: Symbol.for("PokemonGateway"),
  RegionGateway: Symbol.for("RegionGateway"),
  CityGateway: Symbol.for("CityGateway"),
  DateGateway: Symbol.for("DateGateway"),
  TimeGateway: Symbol.for("TimeGateway"),
  ScheduleGateway: Symbol.for("ScheduleGateway"),

  ListPokemonsUseCase: Symbol.for("ListPokemonsUseCase"),
  GetPokemonUseCase: Symbol.for("GetPokemonUseCase"),
  ListRegionsUseCase: Symbol.for("ListRegionsUseCase"),
  ListCitiesUseCase: Symbol.for("ListCitiesUseCase"),
  ListDatesUseCase: Symbol.for("ListDatesUseCase"),
  ListTimesUseCase: Symbol.for("ListTimesUseCase"),
  PostScheduleUseCase: Symbol.for("PostScheduleUseCase"),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);
container.bind(Registry.AxiosAdapterScheduling).toConstantValue(scheduling);

//########## GATEWAYS
container.bind(Registry.PokemonGateway).toDynamicValue((context) => {
  return new PokemonHttpGateway(context.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.RegionGateway).toDynamicValue((context) => {
  return new RegionHttpGateway(context.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.CityGateway).toDynamicValue((context) => {
  return new CityHttpGateway(context.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.DateGateway).toDynamicValue((context) => {
  return new DateHttpGateway(
    context.container.get(Registry.AxiosAdapterScheduling)
  );
});
container.bind(Registry.TimeGateway).toDynamicValue((context) => {
  return new TimeHttpGateway(
    context.container.get(Registry.AxiosAdapterScheduling)
  );
});
container.bind(Registry.ScheduleGateway).toDynamicValue((context) => {
  return new ScheduleHttpGateway(
    context.container.get(Registry.AxiosAdapterScheduling)
  );
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
container.bind(Registry.ListCitiesUseCase).toDynamicValue((context) => {
  return new ListCitiesUseCase(context.container.get(Registry.CityGateway));
});
container.bind(Registry.ListDatesUseCase).toDynamicValue((context) => {
  return new ListDatesUseCase(context.container.get(Registry.DateGateway));
});
container.bind(Registry.ListTimesUseCase).toDynamicValue((context) => {
  return new ListTimesUseCase(context.container.get(Registry.TimeGateway));
});
container.bind(Registry.PostScheduleUseCase).toDynamicValue((context) => {
  return new PostScheduleUseCase(
    context.container.get(Registry.ScheduleGateway)
  );
});

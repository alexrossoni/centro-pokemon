import { City } from "../entities/city";

export interface CityGateway {
  findAll(name: string): Promise<City[]>;
}

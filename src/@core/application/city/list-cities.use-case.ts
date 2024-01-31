import { City } from "../../domain/entities/city";
import { CityGateway } from "../../domain/gateways/city.gateway";

export class ListCitiesUseCase {
  constructor(private cityGate: CityGateway) {}

  async execute(name: string): Promise<City[]> {
    return this.cityGate.findAll(name);
  }
}

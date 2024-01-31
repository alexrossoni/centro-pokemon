import { Region } from "../../domain/entities/region";
import { RegionGateway } from "../../domain/gateways/region.gateway";

export class ListRegionsUseCase {
  constructor(private regionGate: RegionGateway) {}

  async execute(): Promise<Region[]> {
    return this.regionGate.findAll();
  }
}

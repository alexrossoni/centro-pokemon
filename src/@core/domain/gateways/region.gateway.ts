import { Region } from "../entities/region";

export interface RegionGateway {
  findAll(): Promise<Region[]>;
}

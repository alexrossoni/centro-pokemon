import { AxiosInstance } from "axios";
import { Region } from "../../domain/entities/region";
import { RegionGateway } from "../../domain/gateways/region.gateway";

export class RegionHttpGateway implements RegionGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Region[]> {
    return this.http.get<any>("/region").then((res) => {
      return res.data.results.map(
        (data: any) =>
          new Region({
            name: data.name,
            url: data.url,
          })
      );
    });
  }
}

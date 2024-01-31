import { AxiosInstance } from "axios";
import { City } from "../../domain/entities/city";
import { CityGateway } from "../../domain/gateways/city.gateway";

export class CityHttpGateway implements CityGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(name: string): Promise<City[]> {
    return this.http.get<any>(`/region/${name}`).then((res) => {
      return res.data.locations.map(
        (data: any) =>
          new City({
            name: data.name,
            url: data.url,
          })
      );
    });
  }
}

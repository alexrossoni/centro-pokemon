import { AxiosInstance } from "axios";
import { DateGateway } from "../../domain/gateways/date.gateway";

export class DateHttpGateway implements DateGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<string[]> {
    return this.http
      .get("/date", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      });
  }
}

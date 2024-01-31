import { AxiosInstance } from "axios";
import { DateGateway } from "../../domain/gateways/date.gateway";

export class TimeHttpGateway implements DateGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<string[]> {
    return this.http
      .post("/time", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      });
  }
}

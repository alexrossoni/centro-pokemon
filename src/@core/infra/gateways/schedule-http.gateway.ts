import { AxiosInstance } from "axios";
import { ScheduleGateway } from "../../domain/gateways/schedule.gateway";

export class ScheduleHttpGateway implements ScheduleGateway {
  constructor(private http: AxiosInstance) {}

  async submitForm(form: object): Promise<any[]> {
    return this.http.post("/schedule", form).then((res) => {
      return res.data;
    });
  }
}

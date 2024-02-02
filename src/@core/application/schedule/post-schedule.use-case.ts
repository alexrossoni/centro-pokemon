import { ScheduleGateway } from "../../domain/gateways/schedule.gateway";

export class PostScheduleUseCase {
  constructor(private schedule: ScheduleGateway) {}

  async execute(form: object): Promise<string[]> {
    return this.schedule.submitForm(form);
  }
}

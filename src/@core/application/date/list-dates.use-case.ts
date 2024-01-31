import { DateGateway } from "../../domain/gateways/date.gateway";

export class ListDatesUseCase {
  constructor(private dateGate: DateGateway) {}

  async execute(): Promise<string[]> {
    return this.dateGate.findAll();
  }
}

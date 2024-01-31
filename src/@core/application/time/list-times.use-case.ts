import { TimeGateway } from "../../domain/gateways/time.gateway";

export class ListTimesUseCase {
  constructor(private timeGate: TimeGateway) {}

  async execute(): Promise<string[]> {
    return this.timeGate.findAll();
  }
}

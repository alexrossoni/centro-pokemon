export interface ScheduleGateway {
  submitForm(form: object): Promise<any>;
}

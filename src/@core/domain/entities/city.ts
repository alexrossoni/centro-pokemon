export type CityProps = {
  name: string;
  url: string;
};

export class City {
  constructor(public props: CityProps) {}

  get name() {
    return this.props.name;
  }

  get url() {
    return this.props.url;
  }

  toJSON() {
    return {
      name: this.name,
      url: this.url,
    };
  }
}

export type RegionProps = {
  name: string;
  url: string;
};

export class Region {
  constructor(public props: RegionProps) {}

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

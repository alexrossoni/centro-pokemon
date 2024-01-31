export type PokemonProps = {
  name: string;
  url: string;
};

export class Pokemon {
  constructor(public props: PokemonProps) {}

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

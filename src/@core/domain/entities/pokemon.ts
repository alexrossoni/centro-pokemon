export type PokemonProps = {
  name: string;
  url?: string;
  generation?: number;
};

export class Pokemon {
  constructor(public props: PokemonProps) {}

  get name() {
    return this.props.name;
  }

  get url() {
    return this.props.url;
  }

  get generation() {
    return this.props.generation;
  }

  toJSON() {
    const json: PokemonProps = {
      name: this.name,
    };

    if (this.url !== undefined) {
      json.url = this.url;
    }

    if (this.generation !== undefined) {
      json.generation = this.generation;
    }

    return json;
  }
}

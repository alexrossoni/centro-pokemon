export interface IMainButtonHeader {
  $expanded: boolean;
  sourceImage: string;
  altImage: string;
  btnText: string;
}

export interface IInput {
  labelText: string;
  idInput: string;
  typeInput: string;
  placeholder: string;
}

export interface ISelect {
  labelText: string;
  idSelect: string;
  $isSelectPokemon: boolean;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: any;
}

export interface ISubHeader {
  page: string;
  description: string;
}

export interface IButtonAddPokemon {
  $isAddPokemon?: boolean;
}

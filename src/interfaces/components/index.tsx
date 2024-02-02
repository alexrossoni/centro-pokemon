import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export interface IMainButtonHeader {
  $expanded: boolean;
  sourceImage: string;
  altImage: string;
  btnText: string;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  idInput: string;
  typeInput: string;
  placeholder: string;
}

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string;
  idSelect?: string;
  $isSelectPokemon: boolean;
  options?: string[] | { name: string }[];
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

export interface IError {
  error: boolean;
}

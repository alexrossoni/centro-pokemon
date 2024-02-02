/* eslint-disable react/display-name */
import { DivLabelSelect } from "./styles";
import { ISelect } from "../../interfaces/components";
import { Ref, forwardRef } from "react";

export const Select = forwardRef(
  (
    {
      labelText,
      idSelect,
      $isSelectPokemon,
      options,
      placeholder,
      disabled,
      ...props
    }: ISelect,
    ref: Ref<HTMLSelectElement>
  ) => {
    return (
      <DivLabelSelect $isSelectPokemon={$isSelectPokemon}>
        <label htmlFor={idSelect}>
          {labelText}
          {props.required && <span style={{ color: "red" }}>*</span>}
        </label>
        <select
          name={labelText}
          id={idSelect}
          {...props}
          disabled={disabled}
          ref={ref}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((item: any) =>
            $isSelectPokemon ? (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ) : (
              <option key={item} value={item}>
                {typeof item === "object" ? item.name : item}
              </option>
            )
          )}
        </select>
      </DivLabelSelect>
    );
  }
);

import { DivLabelSelect } from "./styles";
import { ISelect } from "../../interfaces/components";

export const Select = ({
  labelText,
  idSelect,
  $isSelectPokemon,
  options,
  placeholder,
  disabled,
  ...props
}: ISelect) => {
  return (
    <>
      <DivLabelSelect $isSelectPokemon={$isSelectPokemon}>
        <label htmlFor={idSelect}>{labelText}</label>
        <select name={labelText} id={idSelect} {...props} disabled={disabled}>
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((item: any) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </DivLabelSelect>
    </>
  );
};

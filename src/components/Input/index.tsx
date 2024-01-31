import { IInput } from "../../interfaces/components";
import { DivLabelInput } from "./styles";

export const Input = ({
  labelText,
  idInput,
  typeInput,
  placeholder,
}: IInput) => {
  return (
    <>
      <DivLabelInput>
        <label htmlFor={idInput}>{labelText}</label>
        <input id={idInput} type={typeInput} placeholder={placeholder} />
      </DivLabelInput>
    </>
  );
};

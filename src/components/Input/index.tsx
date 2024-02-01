/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { IInput } from "../../interfaces/components";
import { DivLabelInput } from "./styles";

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ labelText, idInput, typeInput, placeholder, ...props }: IInput, ref) => {
    return (
      <DivLabelInput>
        <label htmlFor={idInput}>{labelText}</label>
        <input
          id={idInput}
          type={typeInput}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />
      </DivLabelInput>
    );
  }
);

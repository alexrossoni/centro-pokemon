/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { IInput } from "../../interfaces/components";
import { DivLabelInput } from "./styles";

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      labelText,
      idInput,
      typeInput,
      placeholder,
      isRequired,
      ...props
    }: IInput,
    ref
  ) => {
    return (
      <DivLabelInput>
        <label htmlFor={idInput}>
          {labelText}
          {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
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

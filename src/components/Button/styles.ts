import styled from "styled-components";
import { IButtonAddPokemon } from "../../interfaces/components";

export const Button = styled.button<IButtonAddPokemon>`
  height: 42px;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${(props: IButtonAddPokemon) =>
    props.$isAddPokemon ? "var(--gray-900)" : "var(--white)"};
  background-color: ${(props: IButtonAddPokemon) =>
    props.$isAddPokemon ? "transparent" : "var(--bg-red)"};
  border: ${(props: IButtonAddPokemon) =>
    props.$isAddPokemon ? "solid 1px var(--gray-900)" : "transparent"};
  border-radius: 50px;
  font-weight: 700;
  font-size: ${(props: IButtonAddPokemon) =>
    props.$isAddPokemon ? "12px" : "14px"};
  cursor: pointer;
  padding: 0px 15px;

  &:disabled {
    background-color: var(--gray-100);
    color: var(--border-gray);
    border: none;
    cursor: not-allowed;
  }
`;

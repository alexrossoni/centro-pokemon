import styled from "styled-components";
import { ISelect } from "../../interfaces/components";

type RestrictedSelect = Pick<ISelect, "$isSelectPokemon">;

export const DivLabelSelect = styled.div<RestrictedSelect>`
  display: flex;
  width: 100%;
  flex-direction: ${(props: RestrictedSelect) =>
    props.$isSelectPokemon ? "row" : "column"};
  align-items: ${(props: RestrictedSelect) =>
    props.$isSelectPokemon ? "center" : "none"};
  gap: ${(props: RestrictedSelect) =>
    props.$isSelectPokemon ? "2rem" : ".5rem"};
  position: relative;

  > label {
    font-size: 12px;
    font-weight: bold;
    color: var(--gray-900);
    flex-shrink: 0;
  }

  > select {
    width: 100%;
    height: 45px;
    font-size: 14px;
    font-weight: 500;
    padding-left: 0.5rem;
    border-radius: 0.5rem;
    border: solid 2px var(--border-gray);
    color: var(--gray-100);
  }
`;

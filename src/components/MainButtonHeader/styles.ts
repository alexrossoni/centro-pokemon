import styled from "styled-components";
import { IMainButtonHeader } from "../../interfaces/components";

type RestrictedMainButtonHeader = Pick<IMainButtonHeader, "$expanded">;

export const MainButtonContainer = styled.div<RestrictedMainButtonHeader>`
  display: inline-flex;
  height: 60px;
  width: 60px;
  margin: 0 5px;
  overflow: hidden;
  background: var(--bg-red);
  border-radius: 50px;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 60px;
    width: 60px;
    text-align: center;
    border-radius: 50px;
    box-sizing: border-box;
    line-height: 60px;
    transition: all 0.3s ease-out;
  }

  span {
    font-size: 20px;
    font-weight: 700;
    line-height: 60px;
    margin-left: 10px;
    transition: all 0.3s ease-out;
    color: var(--white);
  }

  /* Estilos para telas maiores que 720px de largura */
  @media only screen and (min-width: 720px) {
    transition: all 0.3s ease-out;
    width: ${props => (props.$expanded ? '16.5rem' : '60px')};
  
    &:hover {
      width: 16.5rem;
      filter: brightness(1.05)
    }
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    flex-shrink: 0;
  }
`;

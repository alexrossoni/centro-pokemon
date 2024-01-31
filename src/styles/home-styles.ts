import styled from "styled-components";

type BgContainerProps = {
  $source?: string
}

export const Container = styled.div<BgContainerProps>`
  width: 100vw;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-image: url(${props => (props.$source ? props.$source : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  h1 {
    font-size: 32px;
    color: var(--white);
    font-weight: 700;
    text-align: center;
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    padding: 0 1rem;

    h1 {
      font-size: 24px;
    }
  }
`;

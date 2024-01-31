import styled from "styled-components";

export const FooterStyle = styled.footer`
  width: 100%;
  min-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-900);

  span {
    font-size: 14px;
    color: var(--white);
    font-weight: 400;
    text-align: center;
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    padding: .5rem 1rem;
  }
`;

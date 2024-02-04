import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background: var(--white);
`;

export const TextContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  gap: 2rem;

  > h1 {
    font-size: 18px;
  }

  article {
    > h2 {
      font-size: 16px;
      margin-bottom: 2rem;
    }

    > p {
      font-size: 14px;
      /* text-align: justify; */

      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    width: 70%;
  }
`;

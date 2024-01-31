import styled from "styled-components";

export const SubHeaderContainer = styled.section`
  width: 100%;
  height: 11.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 7rem;
  color: var(--white);
  background-color: var(--bg-red);

  > div {
    display: flex;
    align-items: center;
    gap: .25rem;

    > p {
      font-size: 12px;
      font-weight: 700;
    }
  }

  > h2 {
    font-size: 32px;
    font-weight: 700;
  }

  > p {
    font-size: 14px;
    font-weight: 400;
  }

  /* Estilos para telas maiores que 720px de largura */
  @media only screen and (max-width: 720px) {
    height: 9rem;
    padding: .5rem 2rem;

    > div {
      > p {
        font-size: 10px;
        flex-shrink: 0;
      }
    }

    > h2 {
      font-size: 16px;
    }

    > p {
      font-size: 10px;
    }
  }
`;

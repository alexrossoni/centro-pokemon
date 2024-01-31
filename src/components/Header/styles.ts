import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  height: 6.5rem;
  background: var(--white);
  padding: 0 5rem;
  flex-shrink: 0;

  nav {
    display: flex;
    align-items: center;
    gap: 3rem;
    text-align: center;

    > a:nth-child(1) {
      font-weight: 400;
      text-decoration: none;
      color: var(--black);
      cursor: pointer;
    }

    > a:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .75rem 1.5rem;
      font-weight: 700;
      background-color: var(--bg-red);
      color: var(--white);
      border: none;
      border-radius: 5rem;
      text-decoration: none;
      cursor: pointer;
    }
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    flex-shrink: unset;
    height: auto;
    flex-direction: column;
    padding: .5rem 2rem;

    > nav {
      width: 100%;
      justify-content: space-evenly;
      margin-top: 1rem;
      text-align: center;
      font-size: 12px;

      > a:nth-child(2) {
        padding: .5rem 1rem;
      }
    }
  }
`;

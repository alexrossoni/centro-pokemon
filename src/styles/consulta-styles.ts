import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background: var(--white);

  > .imageErrorContainer {
    width: 100%;
    max-height: 400px;
    max-width: 600px;
    aspect-ratio: 600/400;
    margin-top: 2rem;
    position: relative;
  }
`;

export const FormContainer = styled.form`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  gap: 2rem;

  > h1 {
    font-size: 24px;
    font-weight: 600;
  }

  > hr {
    width: 100%;
  }

  /* Estilos para telas menores que 1100px de largura */
  @media only screen and (max-width: 1100px) {
    width: 70%;
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    width: 90%;
  }
`;

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

export const RegisterYourTeamContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2rem;

  > .registerYourTeamSessionHeader {
    > h2 {
      font-size: 12px;
      font-weight: 700;
      color: var(--black);
    }

    > span {
      font-size: 12px;
      font-weight: 500;
      color: var(--gray-100);
    }
  }

  > .registerYourTeamSessionPokemons {
    width: 100%;
    display: flex;
    align-items: center;

    > svg {
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ButtonRemoveSelect = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  color: var(--bg-red);
  cursor: pointer;
  border-radius: 50%;
`;

export const CheckoutFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-100);

  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;

    > .observation {
      font-size: 8px;
    }
  }

  > section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    > span {
      font-size: 24px;
      color: var(--black);
      font-weight: 600;
    }
  }

  /* Estilos para telas menores que 720px de largura */
  @media only screen and (max-width: 720px) {
    font-size: 10px;

    > section {
      flex-direction: column;
      gap: 0.75rem;

      > span {
        font-size: 20px;
        color: var(--black);
        font-weight: 600;
      }
    }
  }
`;

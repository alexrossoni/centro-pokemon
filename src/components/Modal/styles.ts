import styled from "styled-components";
import { IModal } from "../../interfaces/components";

type RestrictedModal = Pick<IModal, "$isOpen">;

export const Container = styled.div<RestrictedModal>`
  display: ${(props: RestrictedModal) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

export const ContentContainer = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 1rem;
  height: 18rem;
  border: 1px solid var(--bg-red);
  background: var(--white);
  padding: 0.5rem;
  text-align: center;
  position: relative;

  > h1 {
    font-size: 20px;
    font-weight: 700;
  }

  > .icon {
    width: auto;
    max-height: 400px;
    max-width: 600px;
    aspect-ratio: 600/400;
    position: relative;
  }

  > .description {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-100);
  }

  > .btn-close-modal {
    position: absolute;
    right: 10px;
    top: 10px;
    font-weight: 700;
    color: var(--gray-100);
    cursor: pointer;
  }

  /* Estilos para telas menores que 560px de largura */
  @media only screen and (max-width: 560px) {
    width: 75%;
  }

  /* Estilos para telas menores que 420px de largura */
  @media only screen and (max-width: 420px) {
    width: 85%;
  }
`;

import styled, { keyframes } from "styled-components";

// Animação girando
const spin = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: relative;
  gap: 2rem;
  text-align: center;

  > h1 {
    font-size: 32px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;

  > img {
    animation: ${spin} 2s linear infinite;
    cursor: pointer;
  }

  > .questionIcon {
    position: absolute;
    top: -15px;
    right: 0;
    font-size: 32px;
    font-weight: 700;
    transform: rotate(15deg);
    color: var(--bg-red);
  }
`;

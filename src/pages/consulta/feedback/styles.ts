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

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: relative;

  > h1 {
    font-size: 32px;
  }
`;

export default function NotFoundPage() {
  return (
    <Container>
      <h1>Página não encontrada!</h1>
    </Container>
  );
}

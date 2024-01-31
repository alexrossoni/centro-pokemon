import styled from "styled-components";

export const DivLabelInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 12px;
    font-weight: 700;
    color: var(--gray-900);
  }

  input {
    width: 100%;
    height: 45px;
    font-size: 14px;
    font-weight: 500;
    padding-left: 0.75rem;
    border-radius: 0.5rem;
    border: solid 2px var(--border-gray);
    color: var(--gray-100);
  }
`;

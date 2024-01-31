import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #FFFFFF;
    --black: #000000;
    --gray-100: #747474;
    --gray-900: #1D1D1D;
    --border-gray: #D5D5D5;
    --bg-red: #E40F0F;
    --bg-blue: #0FA4E4;
  }

  html, body {
    background: var(--white);
    scroll-behavior: smooth;
  }

  body, input, textarea, select, button {
    font: 400 1rem 'Inter', sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const AppMainContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

import { createGlobalStyle } from "styled-components";
import "./animations.css";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    box-sizing: border-box;
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  :root {
    --background: #f9f9f9;
    --background2: #fff;
    --primary: #1976D2;
    --primary_hover: #1B7CDE;
    --secondary: #0A2E52; 
    --tertiary: #5B9AD9; 
    --separator:#e2e8f0;
    --error: #ec1111;
    --success: #0fc000;
    --warning: #bfc30a;
    --radius-1: .25rem;
  }

  body {
    background-color: var(--background) !important;
    height: 100vh;
    display: flex;
    margin: auto;
    box-sizing: inherit;
    margin: auto;
    
    & #root {
      flex: 1;
    }

    .chakra-input {
      background-color: var(--background2);
    }
  }
`;

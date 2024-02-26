import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --color-primary-light: #DF5757;
    --color-gray: #F0F0F0;
    --color-lightgray: #E0E0E0;
}

body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    margin: 0 5%;
}

`
export default GlobalStyle
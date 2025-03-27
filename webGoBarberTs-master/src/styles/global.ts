import { createGlobalStyle } from 'styled-components';
import githubbackground from '../assets/github-background.svg';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    /* background: #F0F0F5 url(${githubbackground}) no-repeat 70% top; */
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }
  h1,h2,h3,h4,h5,h6,strong {
    font-weight: 500;
  }

  ul {
    display: block;
    list-style-type: disc;
    /* margin-block-start: 1em; */
    /* margin-block-end: 1em; */
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    /* padding-inline-start: 40px; */
    box-sizing: border-box;

    margin-top: 0px;
    /* margin-bottom: 1rem;
     */
  }
  .list-inline {
    li {
      list-style: none;
      padding-left: 0px;
      display: inline-block;
    }
  }
  .color-box {
    height: 25px;
    width: 25px;
    //customizer
    cursor: pointer;
    margin: 0.5rem;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
    border-radius: 0.3rem;

  }
  .selected
  {
    transition: all 0.2s ease-in-out 0s;
    box-shadow: rgba(52, 144, 220, 0.5) 0px 0px 0px 3px;
  }
  .bg-default {
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgb(120, 120, 120) !important;
    border-image: initial !important;
}
  }
  .bg-primary {
    background-color: rgb(115, 103, 240) !important;
  }
  .bg-success {
    background-color: rgb(40, 199, 111) !important;
  }
  .bg-danger {
    background-color: rgb(234, 84, 85) !important;
  }
  .bg-info {
    background-color: rgb(0, 207, 232) !important;
  }
  .bg-warning {
    background-color: rgb(255, 159, 67) !important;
  }
  .bg-dark {
    background-color: rgb(30, 30, 30) !important;
  }
  .d-inline-block {
    display: flex;
    flex-direction: row;
  }
  .mr-1 {
    margin-right: 1rem !important;
  }
  .mt-1 {
    margin-top: 0.5rem !important;
  }
  /* #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  } */
  button {
    cursor: pointer;
  }
`;

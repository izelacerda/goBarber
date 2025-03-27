import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 300px;
  right: -300px;
  padding: 0;
  background: ${props => props.theme.colors.background};
  /* background-color: #fff; */
  z-index: 1051;
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  transition: right 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
  backface-visibility: hidden;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  ${props =>
    props.isOpen &&
    css`
      right: 0;
    `}
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 30px;
  top: 20px;
  padding: 7px;
  width: auto;
  z-index: 10;
  color: #626262;
  i {
    font-size: 1.71rem;
  }
`;

export const CustomizerToggle = styled.div`
  // customizer toggle icon
  /* .customizer-toggle { */
  background: #7367f0;
  /* background: ${props => props.theme.colors.background}; */
  /* color: #fff; */
  display: block;
  box-shadow: -3px 0px 8px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  left: -29px;
  text-align: center;
  line-height: 31px;
  cursor: pointer;
  /* } */
`;
const appearFromRight = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const OpenIcon = styled.div`
  button {
    background-color: transparent;
    border: none;
    width: 30px;
    height: 30px;
  }
  svg {
    animation: ${appearFromRight} 2s infinite linear;
    position: relative;
    color: white;
  }
`;
export const ColorBox = styled.div`
  // theme color box styles
  /* .color-box { */
  height: 35px;
  width: 35px;
  margin: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  &.selected {
    box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
    transition: all 0.2s ease-in-out;
  }
  &.disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
  /* } */
`;

export const TitleContainer = styled.div`
  padding: 1rem !important;
`;
export const Title = styled.div`
  display: flex !important;
  justify-content: space-between;
  h4 {
    font-size: 1rem;
  }
  line-height: 1;
  text-transform: uppercase;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
export const Description = styled.div`
  box-sizing: border-box;
  color: #626262;
  small {
    font-size: 0.7rem;
  }
`;

export const ConfigurationContainer = styled.div`
  padding: 0.8rem !important;
`;

export const ConfigurationTitle = styled.div`
  display: flex !important;
  justify-content: space-between;
  font-size: 11px;
`;
export const ConfigurationContent = styled.div``;

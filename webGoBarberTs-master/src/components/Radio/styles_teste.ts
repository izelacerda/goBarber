import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isChecked: boolean;
}
interface RadioContainerProps {
  size: string;
  type: string;
  isChecked: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0.25rem 0;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 200;
    background: red;

    cursor: pointer;

    &:disabled {
      cursor: default;
      pointer-events: none;
      + .vx-radio {
        cursor: default;
        opacity: 0.5;
      }
    }
    &:active {
      ~ .vx-radio {
        transform: scale(1.1);
      }
    }
  }
`;

export const RadioContainer = styled.div<RadioContainerProps>`
  ${props =>
    props.isChecked &&
    css`
      transform: rotate(0deg);
      outline: 0;
    `}

  ${props =>
    props.isChecked &&
    props.type === 'circle' &&
    css`
      background: #7367f0;
      box-shadow: 0 3px 12px 0 rgba('#7367f0', 0.4);
      opacity: 1;
      transform: scale(1);
    `}
  ${props =>
    props.isChecked &&
    props.type === 'border' &&
    css`
      opacity: 0;
      transform: scale(0.3);
    `}
  ${props =>
    props.isChecked &&
    css`
      background: #7367f0 !important;
      box-shadow: 0 3px 12px 0 rgba('#7367f0', 0.4) !important;
    `}
`;
export const RadioContent = styled.span<RadioContainerProps>`
  cursor: pointer;
  position: relative;
  width: 18px; // radio-box
  height: 18px; // radio-box
  transition: all 0.2s ease;
  margin-right: 0.5rem;
  ${props =>
    props.size === 'sm' &&
    css`
      width: 13px; // sm-radio
      height: 13px; // sm-radio
    `}
  ${props =>
    props.size === 'lg' &&
    css`
      width: 22px; // lg-radio
      height: 22px; // lg-radio
    `}
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  transition: all 0.25s ease;
  top: 0;
  border-radius: 50%;
  ${props =>
    props.type === 'border' &&
    css`
      background: transparent;
      border: 2px solid #b8c2cc; // 2px vs-checkbox-radio-border-width   $vs-checkbox-radio-border-color: #b8c2cc;
    `}
  ${props =>
    props.type === 'circle' &&
    css`
      opacity: 0;
      transform: scale(0.1);
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin-right: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

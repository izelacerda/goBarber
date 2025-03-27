import styled from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
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
    &:checked {
      ~ .vx-radio {
        transform: rotate(0deg);
        outline: 0;
        .vx-radio--circle {
          background: #7367f0;
          box-shadow: 0 3px 12px 0 rgba('#7367f0', 0.4);
          opacity: 1;
          transform: scale(1);
        }
        .vx-radio--border {
          opacity: 0;
          transform: scale(0.3);
        }
      }
    }
    &:checked ~ .vx-radio {
      .vx-radio--circle {
        background: #7367f0 !important;
        box-shadow: 0 3px 12px 0 rgba('#7367f0', 0.4) !important;
      }
    }

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
  .vx-radio {
    cursor: pointer;
    position: relative;
    width: 18px; // radio-box
    height: 18px; // radio-box
    transition: all 0.2s ease;
    margin-right: 0.5rem;
    &.vx-radio-sm {
      width: 13px; // sm-radio
      height: 13px; // sm-radio
    }
    &.vx-radio-lg {
      width: 22px; // lg-radio
      height: 22px; // lg-radio
    }
    .vx-radio--border,
    .vx-radio--circle {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      transition: all 0.25s ease;
      top: 0;
      border-radius: 50%;
    }
    .vx-radio--border {
      background: transparent;
      border: 2px solid #b8c2cc; // 2px vs-checkbox-radio-border-width   $vs-checkbox-radio-border-color: #b8c2cc;
    }
    .vx-radio--circle {
      opacity: 0;
      transform: scale(0.1);
    }
  }
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

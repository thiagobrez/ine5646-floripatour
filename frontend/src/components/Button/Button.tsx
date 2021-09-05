import React, {CSSProperties, InputHTMLAttributes, ReactNode} from 'react';

import styled, {css} from 'styled-components/macro';

import theme from '../../utils/theme';


export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  height: number;
  backgroundColor: keyof typeof theme.colors;
  borderColor?: keyof typeof theme.colors;
  // onClick?: () => void;
  stretch?: boolean;
  // disabled: boolean;
  style?: CSSProperties;
  // children: ReactNode | ReactNode[];
};

const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => `var(--color-${backgroundColor})`};
  min-width: 40px;
  border-radius: 12px;
  padding: 12px;
  border: none;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  &:focus,
  &:hover {
      opacity: 0.7;
  }

  ${({ borderColor }) =>
    borderColor &&
    css`
      border: 2px solid var(--color-${borderColor});
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      &,
      &:active {
        opacity: 0.3;
      }
    `}
  ${({ stretch }) =>
    stretch &&
    css`
      flex: 1;
    `}
`;

const Button = ({
  height,
  backgroundColor,
  borderColor,
  stretch,
  onClick,
  disabled,
  style,
  children,
  ...rest
}: ButtonProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Container
      height={height}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      stretch={stretch}
      disabled={disabled}
      onClick={disabled ? () => null : onClick}
      style={style}
      {...rest}
    >
      {children}
    </Container>
  );
};

Button.defaultProps = {
  height: 40,
  backgroundColor: 'transparent',
  disabled: false,
};

export default Button;

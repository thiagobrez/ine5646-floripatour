import React, { InputHTMLAttributes } from 'react';

import styled from 'styled-components/macro'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 64px;
  background: var(--color-inputBackgroundColor);
  border-radius: 12px;
  padding: 0 24px;
  border: 2px solid transparent;

  // Direct children of <form> should have margin
  form > & {
    margin-bottom: 8px;
  }

  // Except the last one
  :last-of-type {
    margin-bottom: 0;
  }

  label {
    position: absolute;
    top: 21px;
    left: 24px;
    color: var(--color-inputPlaceholder);
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    font-size: 15px;
    line-height: 21px;
    font-weight: 600;
  }

  #search-icon-wrapper svg {
    fill: var(--color-inputPlaceholder);
  }

  :focus-within {
    border-color: var(--color-sunriseGold);
    background: var(--color-sunriseGoldBackground);
    #search-icon-wrapper svg {
      fill: var(--color-sunriseGold);
    }
    #chevron-wrapper {
      transform: rotate(180deg);
      svg {
        fill: var(--color-sunriseGold);
      }
    }
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: 14px;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  input:focus,
  input:focus + label {
    color: var(--color-sunriseGold);
  }
`;

const StyledInput = styled.input`
  margin-top: 32px;
  width: 100%;
  height: 21px;
  border-width: 0;
  padding: 0;
  background-color: transparent;
  font-weight: 600;
  font-style: normal;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.01em;
  text-align: left;
  color: var(--color-slateGray);

  ::placeholder {
    color: transparent;
  }
`;

const BaseInput = (
  { name, placeholder, ...inputProps }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  if (!ref) ref = React.createRef();

  const focusInput = () => {
    const auxRef = ref as React.RefObject<HTMLInputElement>;
    auxRef?.current && auxRef.current.focus();
  };

  return (
    <Container onClick={focusInput}>
      <StyledInput
        name={name}
        placeholder={placeholder}
        data-testid="comp-input"
        {...inputProps}
        ref={ref}
      />

      <label htmlFor={name}>{placeholder}</label>
    </Container>
  );
};

const Input = React.forwardRef(BaseInput);


const defaultProps = {
  type: 'text',
};

export default styled(Input)``;
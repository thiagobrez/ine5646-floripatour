import { createGlobalStyle } from "styled-components/macro";

export const hexToRgba = (hex: string, a = 1) => {
  const [r, g, b] = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) as number[];

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const theme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    restorationBlue: '#1C244F',
    sunriseGold: '#F6831D',
    graniteGray: '#D1CBC3',
    slateGray: '#4E4F51',
    blueGray: '#AEB1C1',
    platGray: '#B3B4B4',
    warningRed: '#E2323D',
    dark: '#111111',
    grayDark: '#3D3D3D',
    infoColor: '#23AEB7',
    successColor: '#1C8C3B',
    errorColor: '#B72323',
    darkGreen: '#43A17C',
    inputPlaceholder: '#9A9EA7',
    sunriseGoldBackground: '#FBEBDD',
  },
};

export const Styles = createGlobalStyle`
  html {
    height: 100%;
    font-family: 'Poppins', sans-serif;
    font-family: 'Roboto', sans-serif;

    ${Object.entries(theme.colors).reduce(
      (final: string[], [key, value]: [string, string]) => {
        final.push(
          `--color-${key}: ${value};`,
          `--color-${key}-08: ${hexToRgba(value, 0.08)};`,
          `--color-${key}-10: ${hexToRgba(value, 0.1)};`,
          `--color-${key}-15: ${hexToRgba(value, 0.15)};`,
          `--color-${key}-20: ${hexToRgba(value, 0.2)};`,
          `--color-${key}-25: ${hexToRgba(value, 0.25)};`,
          `--color-${key}-30: ${hexToRgba(value, 0.3)};`,
          `--color-${key}-35: ${hexToRgba(value, 0.35)};`,
          `--color-${key}-40: ${hexToRgba(value, 0.4)};`,
          `--color-${key}-45: ${hexToRgba(value, 0.45)};`,
          `--color-${key}-50: ${hexToRgba(value, 0.5)};`,
          `--color-${key}-55: ${hexToRgba(value, 0.55)};`,
          `--color-${key}-60: ${hexToRgba(value, 0.6)};`,
          `--color-${key}-65: ${hexToRgba(value, 0.65)};`,
          `--color-${key}-70: ${hexToRgba(value, 0.7)};`,
          `--color-${key}-75: ${hexToRgba(value, 0.75)};`,
          `--color-${key}-80: ${hexToRgba(value, 0.8)};`,
          `--color-${key}-85: ${hexToRgba(value, 0.85)};`,
          `--color-${key}-90: ${hexToRgba(value, 0.9)};`,
          `--color-${key}-95: ${hexToRgba(value, 0.95)};`,
          `--color-${key}-100: ${hexToRgba(value, 1)};`
        );
        return final;
      },
      []
    )};

    --shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    --shadow-soft: 0 1px 2px rgb(0 0 0 / 0.2);
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;

    button {
      background: none;
      border: 0;
      padding: 0;
    }

    input {
      outline: 0;
    }
  }

  #root {
    isolation: isolate;
    height: 100%;
  }
`;

export default theme;

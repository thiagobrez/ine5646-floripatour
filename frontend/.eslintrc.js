module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    es6: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "prettier",
    "eslint-plugin-import-helpers",
    "react-hooks",
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "_",
      },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["/^react$/", "module", "/^@/", ["parent", "sibling", "index"]],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "styled-components",
            message: "Please import from styled-components/macro.",
          },
        ],
        patterns: ["!styled-components/macro"],
      },
    ],
    "react/prop-types": "off",
    "no-console": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": "warn",
  },
  settings: {
    "import/resolver": {
      typescript: {
        directory: "tsconfig.json",
      },
    },
  },
};

import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import globals from "globals"
export default [
  {
    ignores: ["dist", "coverage"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
];

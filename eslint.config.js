import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import sortKeysFix from "eslint-plugin-sort-keys-fix";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "sort-keys-fix": sortKeysFix,
    },
    rules: {
      "sort-keys": "off",
      "sort-keys-fix/sort-keys-fix": "error",
    },
  },
];

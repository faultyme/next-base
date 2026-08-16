import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Turn off rules that conflict with Prettier
      "prettier/prettier": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Add Prettier related ignores
    "node_modules/**",
    "dist/**",
    "coverage/**",
    "*.min.js",
    "pnpm-lock.yaml",
  ]),
]);

export default eslintConfig;

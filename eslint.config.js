import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

const astroBase = astro.configs["flat/base"].map((config) => {
  if (
    Array.isArray(config.files) &&
    config.files.some((pattern) => pattern.includes(".astro/"))
  ) {
    return {
      ...config,
      rules: {
        ...config.rules,
        "prettier/prettier": "off",
      },
    };
  }

  return config;
});

const astroRecommendedRules =
  astro.configs["flat/recommended"].at(-1)?.rules ?? {};

export default [
  {
    ignores: ["dist/**", ".astro/**"],
  },
  ...astroBase,
  {
    name: "astro/recommended-rules",
    rules: astroRecommendedRules,
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];

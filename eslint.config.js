import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import vitest from "@vitest/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import pluginImportX, { createNodeResolver } from "eslint-plugin-import-x";
import pluginPromise from "eslint-plugin-promise";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  /**
   * Set global ignore patterns for build artifacts
   *
   * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores}
   */
  globalIgnores(["dist/"]),
  /**
   * Add `name` property to "recommended" ESLint config, which doesn't exist for compatibility
   *
   * @see {@link https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js#L11-L17}
   */
  { name: "@eslint/js/recommended", ...eslint.configs.recommended },
  tseslint["configs"].recommendedTypeChecked,
  pluginImportX["flatConfigs"].recommended,
  pluginImportX["flatConfigs"].typescript,
  pluginPromise.configs["flat/recommended"],
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  eslintReact.configs["recommended-type-checked"],
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        /**
         * Automatically load `tsconfig.json` files for typed linting rules
         *
         * @see {@link https://typescript-eslint.io/packages/parser/#projectservice}
         */
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md}
       */
      "import-x/newline-after-import": ["error", { considerComments: true }],
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md}
       */
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", ["parent", "sibling", "index"]],
          pathGroups: [{ pattern: "react{,-dom}{,/*}", group: "builtin" }],
          pathGroupsExcludedImportTypes: ["builtin", "object"],
          distinctGroup: false,
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
    settings: {
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/tree/master/resolvers}
       */
      "import-x/resolver-next": [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
    },
  },
  {
    // https://vitest.dev/config/#include
    files: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    ...vitest.configs.recommended,
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint["configs"].disableTypeChecked,
  },
);

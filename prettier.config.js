/** @import { Config } from "prettier" */

/**
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @satisfies {Config}
 */
const prettierConfig = {
  experimentalTernaries: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  trailingComma: "all",
  objectWrap: "collapse",
  proseWrap: "never",
  plugins: ["prettier-plugin-tailwindcss"],
  /**
   * @see {@link https://github.com/tailwindlabs/prettier-plugin-tailwindcss#options}
   */
  tailwindStylesheet: "./src/globals.css",
  tailwindFunctions: ["clsx", "cn", "cva", "twMerge"],
};

export default prettierConfig;

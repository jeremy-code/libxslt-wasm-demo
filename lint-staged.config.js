/** @import { Configuration } from "lint-staged" */

/**
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @satisfies {Configuration}
 */
const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["pnpm run lint", "pnpm run format:check"],
  "*.{json,md,yaml,yml}": "pnpm run format",
};

export default lintStagedConfig;

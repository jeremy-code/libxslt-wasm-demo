import { use } from "react";

import { createStarryNight } from "@wooorm/starry-night";
import textHtmlBasic from "@wooorm/starry-night/text.html.basic";
import textXml from "@wooorm/starry-night/text.xml";

const SCOPES = { "text.xml": textXml, "text.html.basic": textHtmlBasic };
export type Scope = keyof typeof SCOPES;

const starryNightPromise = createStarryNight(Object.values(SCOPES));

export const useStarryNight = () => {
  const starryNight = use(starryNightPromise);
  return starryNight;
};

export type AppI18nPages = Exclude<
  keyof typeof I18nConfigurations.pages,
  "common"
>;

type TCommonLabels = typeof import("./locales/en/common.json");
type TFeature1Labels = typeof import("./locales/en/feature1.json");
type TIndexLabels = typeof import("./locales/en/index.json");

// for the possiblity to use string as keyof I18nNamespaces TODO for now.
export declare type LiteralUnion<T extends U, U = string> =
  | T
  | (U & Record<never, never>);

type t = LiteralUnion<keyof I18nNamespaces>;

export type I18nNamespaces = {
  common: TCommonLabels;
  feature1: TFeature1Labels;
  index: TIndexLabels;
};

export type N = LiteralUnion<keyof I18nNamespaces>;

export const I18nConfigurations = {
  locales: ["en", "da", "en-US"],
  defaultLocale: "en",
  defaultCountryCode: "US",
  pages: {
    common: ["common"],
    feature1: ["feature1"],
    index: ["index"],
  },
};

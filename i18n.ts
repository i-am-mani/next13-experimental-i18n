export type AppI18nPages = Exclude<
  keyof typeof I18nConfigurations.pages,
  "common"
>;

type TCommonLabels = typeof import("./locales/en/common.json");
type TFeature1Labels = typeof import("./locales/en/feature1.json");
type TIndexLabels = typeof import("./locales/en/index.json");

// for the possiblity to use string as keyof I18nNamespaces TODO for now.
export declare type LiteralUnion<T extends U, U = string | number | symbol> =
  | T
  | (U extends symbol ? never : U extends number ? never : never)
  | (U & Record<never, never>);

type t = keyof I18nNamespaces;
type c = LiteralUnion<keyof I18nNamespaces[t]>;

export type I18nNamespaces = {
  common: TCommonLabels;
  feature1: TFeature1Labels;
  index: TIndexLabels;
};

// TODO: enable concatentated keys by namespace and label
type ConcatenatedKeys<T extends Record<string, Record<string, string>>> = {
  [K in keyof T]: `${Extract<K, string>}:${Extract<keyof T[K], string>}`;
}[keyof T];
export type I18nNamespaceSeparatedKeys = ConcatenatedKeys<I18nNamespaces>;

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

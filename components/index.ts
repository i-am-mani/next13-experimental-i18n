export type Namespace = {
  [key: string]: string;
};

export type LocaleNamespaces = {
  [key: string]: Namespace;
};

export type LocaleTranslations = {
  locale: LocaleConfig;
  namespaces: LocaleNamespaces;
};

export type LocaleConfig = {
  languageCode: string;
  countryCode?: string;
  currency?: string;
};

declare global {
  var i18nTranslations: LocaleTranslations;
}

export {};

import { I18nNamespaces } from "../i18n";

export type Namespace<K extends keyof I18nNamespaces> = {
  [key in keyof I18nNamespaces[K]]: string;
};

export type LocaleNamespaces = {
  [key in keyof I18nNamespaces]: Namespace<key>;
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

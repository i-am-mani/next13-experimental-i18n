import { I18nNamespaces } from "../i18n";

type LocaleTranslations = {
  locale: LocaleConfig;
  namespaces: I18nNamespaces;
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

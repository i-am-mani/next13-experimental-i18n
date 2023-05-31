import * as React from "react";
import { I18nProvider } from "../components/I18nProvider";
import { loadNamespacesFromCache } from "../components/initializer";
import { I18NConfig } from "next/dist/server/config-shared";
import { AppI18nPages, I18nConfigurations, I18nNamespaces } from "../i18n";

function getLocale(locale: string) {
  if (locale.indexOf("-") > -1) {
    const [language, country] = locale.split("-");
    return {
      language: language,
      country: country,
    };
  } else {
    return {
      language: locale,
      country: undefined, // use default namespaces
    };
  }
}

export async function I18nPageWrapper(params: {
  locale: string;
  pathname: AppI18nPages;
  children: React.ReactNode;
}) {
  const { language, country } = getLocale(params.locale);

  const translations = await loadNamespacesFromCache(
    [
      ...I18nConfigurations.pages.common,
      ...I18nConfigurations.pages[params.pathname],
    ] as (keyof I18nNamespaces)[],
    language,
    country
  );

  return (
    <I18nProvider namespaces={translations}>{params.children}</I18nProvider>
  );
}

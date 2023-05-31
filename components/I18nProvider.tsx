"use client";
import * as React from "react";
import { LocaleNamespaces } from ".";
import { I18nNamespaces } from "../i18n";

const I18nContext = React.createContext<LocaleNamespaces>(
  {} as LocaleNamespaces
);

export function useTranslationsClient<T extends keyof I18nNamespaces>(
  namespace: T
) {
  const context = React.useContext(I18nContext);
  const translations = context[namespace];

  return (key: keyof I18nNamespaces[T]) => {
    const value = typeof translations === "object" && translations[key];
    return typeof value === "string" ? value : key;
  };
}

export function I18nProvider({
  namespaces,
  children,
}: {
  namespaces: LocaleNamespaces;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={namespaces}>{children}</I18nContext.Provider>
  );
}

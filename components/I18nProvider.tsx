"use client";
import * as React from "react";
import { LocaleNamespaces } from ".";

const I18nContext = React.createContext<LocaleNamespaces>({});

export function useTranslationsClient(namespace: string) {
  const context = React.useContext(I18nContext);
  const translations = context[namespace];

  return (key: string) => {
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

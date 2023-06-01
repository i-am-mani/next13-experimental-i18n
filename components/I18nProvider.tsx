"use client";
import * as React from "react";
import { I18nNamespaces, LiteralUnion } from "../i18n";
import { LocalizationCore } from "./core";
import { LocaleConfig } from ".";

type TContext = { namespaces: I18nNamespaces; config: LocaleConfig };
const I18nContext = React.createContext<TContext>({} as TContext);

export function useTranslationsClient<T extends keyof I18nNamespaces>(
  namespace: T
) {
  const context = React.useContext(I18nContext);
  const i18n = context.config;

  const fn = (
    key: LiteralUnion<keyof I18nNamespaces[T]>,
    interpolation?: { [key: string]: string | number }
  ) => {
    const core = LocalizationCore({
      defaultNamespace: namespace,
      locale: i18n,
      namespaces: context.namespaces,
    });
    return core.t(key as string, interpolation);
  };

  return fn;
}

export function I18nProvider({
  config,
  namespaces,
  children,
}: {
  config: LocaleConfig;
  namespaces: I18nNamespaces;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ namespaces, config }}>
      {children}
    </I18nContext.Provider>
  );
}

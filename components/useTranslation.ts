import { useTranslationsClient } from "./I18nProvider";

export function useTranslationServerOnly(
  namespace: string
): (key: string) => string {
  const namespaces = globalThis.i18nTranslations;
  const namespaceRecords = namespaces[namespace];

  return (key: string) => {
    const value = typeof namespaceRecords === "object" && namespaceRecords[key];
    return typeof value === "string" ? value : key;
  };
}

export function useTranslation(ns: string) {
  const isServerOnly = typeof window === "undefined";
  const useT = isServerOnly ? useTranslationServerOnly : useTranslationsClient;
  return { t: useT(ns) };
}

import { I18nNamespaces, LiteralUnion } from "../i18n";
import { useTranslationsClient } from "./I18nProvider";
import { LocalizationCore } from "./core";

export function useTranslationServerOnly<T extends keyof I18nNamespaces>(
  namespace: T
): (key: LiteralUnion<keyof I18nNamespaces[T]>) => string {
  const i18n = globalThis.i18nTranslations;

  const fn = (
    key: LiteralUnion<keyof I18nNamespaces[T]>,
    interpolation?: { [key: string]: string | number }
  ) => {
    const core = LocalizationCore({
      defaultNamespace: namespace,
      locale: i18n.locale,
      namespaces: i18n.namespaces,
    });
    return core.t(key as string, interpolation);
  };

  return fn;
}

export function useTranslation<T extends keyof I18nNamespaces>(ns: T) {
  const isServerOnly = typeof window === "undefined";
  const useT = isServerOnly ? useTranslationServerOnly : useTranslationsClient;
  return { t: useT<T>(ns) };
}

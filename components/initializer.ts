"use server";
import fs from "fs/promises";
import path from "path";
import { mergeNamespaceInPlace } from "./merge-namespaces";
import { I18nNamespaces } from "../i18n";

async function readLocaleNamespaces(locale: string) {
  const directory = process.cwd() + "/locales/" + locale;
  const files = await fs.readdir(directory);

  const filenames = files.map((name) => name.split(".")[0]);

  const namespaces = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(directory, filename + ".json");
      const fileData = await fs.readFile(filePath);
      return JSON.parse(fileData.toString());
    })
  );

  const namespacesObject = filenames.reduce((acc, filename, index) => {
    acc[filename] = namespaces[index];
    return acc;
  }, {} as any);

  return namespacesObject as I18nNamespaces;
}

async function loadLocaleNamespaces(
  locale: string,
  country?: string,
  currency?: string
): Promise<I18nNamespaces> {
  // list all files in locale directory
  if (
    process.env.NODE_ENV === "production" &&
    globalThis.i18nTranslations?.locale?.languageCode === locale
  ) {
    return globalThis.i18nTranslations.namespaces;
  }

  let localeNamespaces = await readLocaleNamespaces(locale);

  if (country != null) {
    const countryNamespaces = await readLocaleNamespaces(
      locale + "-" + country.toUpperCase()
    );

    mergeNamespaceInPlace(localeNamespaces, countryNamespaces);
  }

  globalThis.i18nTranslations = {
    locale: {
      languageCode: locale,
      countryCode: country,
      currency: currency,
    },
    namespaces: localeNamespaces,
  };

  return localeNamespaces;
}

export async function loadNamespacesFromCache(
  namespaces: (keyof I18nNamespaces)[],
  locale: string,
  country?: string, // TODO:
  currency?: string
) {
  const localeNamespaces = await loadLocaleNamespaces(
    locale,
    country,
    currency
  );

  const namespacesObject = namespaces.reduce((acc, namespace) => {
    acc[namespace] = localeNamespaces[namespace];
    return acc;
  }, {} as any);

  return namespacesObject as I18nNamespaces;
}

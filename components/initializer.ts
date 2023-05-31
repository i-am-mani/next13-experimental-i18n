"use server";
import fs from "fs/promises";
import { LocaleNamespaces } from ".";
import path from "path";
import { mergeNamespaceInPlace } from "./merge-namespaces";

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
  }, {} as LocaleNamespaces);

  return namespacesObject;
}

async function loadLocaleNamespaces(
  locale: string,
  country?: string,
  currency?: string
) {
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
  namespaces: string[],
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
  }, {} as LocaleNamespaces);

  return namespacesObject;
}

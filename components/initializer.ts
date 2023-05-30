"use server";
import fs from "fs/promises";
import { LocaleNamespaces } from ".";
import path from "path";

// let __translationMutex: null | Promise<LocaleNamespaces> = null;

async function loadLocaleNamespaces(locale: string) {
  // list all files in locale directory
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

  globalThis.i18nTranslations = namespacesObject;
  return namespacesObject;
}

export async function loadNamespacesFromCache(
  namespaces: string[],
  locale: string,
  country?: string // TODO:
) {
  console.log({ locale });
  const localeNamespaces = await loadLocaleNamespaces(locale);

  const namespacesObject = namespaces.reduce((acc, namespace) => {
    acc[namespace] = localeNamespaces[namespace];
    return acc;
  }, {} as LocaleNamespaces);

  return namespacesObject;
}

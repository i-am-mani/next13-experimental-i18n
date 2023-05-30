export type LocaleNamespaces = {
  [key: string]: string | LocaleNamespaces;
};

declare global {
  var i18nTranslations: LocaleNamespaces;
}

export {};

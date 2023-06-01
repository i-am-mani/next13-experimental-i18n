import { I18nNamespaces } from "../i18n";

export function mergeNamespaceInPlace(
  lsNamespace: I18nNamespaces,
  rsNamespace: Partial<I18nNamespaces>
) {
  Object.keys(rsNamespace).forEach((namespace) => {
    Object.keys((rsNamespace as any)[namespace]).forEach((label) => {
      const replaceValue = (rsNamespace as any)[namespace][label];
      if (replaceValue == null) return;

      if ((lsNamespace as any)[namespace] == null)
        (lsNamespace as any)[namespace] = {};

      (lsNamespace as any)[namespace][label] = replaceValue;
    });
  });
}

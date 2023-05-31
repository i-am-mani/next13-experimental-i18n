import { LocaleNamespaces } from ".";

export function mergeNamespaceInPlace(
  lsNamespace: LocaleNamespaces,
  rsNamespace: LocaleNamespaces
) {
  Object.keys(rsNamespace).forEach((namespace) => {
    Object.keys(rsNamespace[namespace]).forEach((label) => {
      const replaceValue = rsNamespace[namespace][label];
      if (replaceValue == null) return;

      if (lsNamespace[namespace] == null) lsNamespace[namespace] = {};

      lsNamespace[namespace][label] = replaceValue;
    });
  });
}

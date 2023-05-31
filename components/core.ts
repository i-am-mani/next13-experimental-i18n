import { LocaleConfig, LocaleNamespaces, Namespace as LabelNamespace } from ".";
import { I18nNamespaces } from "../i18n";

function formatCurrency(
  value: number | string,
  cultureCode = "da",
  currency = "DKK",
  maxFractionDigits = 0,
  minFractionDigits = 0
) {
  return new Intl.NumberFormat(cultureCode, {
    style: "currency",
    currency,
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: minFractionDigits,
  }).format(Number(value));
}
const formatters: Record<
  string,
  (value: string | number, config: LocaleConfig) => string
> = {
  currency: (value: string | number, config: LocaleConfig) =>
    formatCurrency(
      value,
      config.countryCode
        ? `${config.languageCode}-${config.countryCode}`
        : config.languageCode,
      config.currency
    ).toString(),
};

function interpolation(
  rawText: string,
  values: Record<string, string | number>,
  config: LocaleConfig
) {
  /**
   * The template string can be in form of `{{ key, format }}` where format is optional
   */
  const regex = /{{\s*(?<key>\w+)\s?(?:,\s?(?<format>\w+))?\s?}}/gi;

  const interpolatedString = rawText.replace(regex, (_match, key, format) => {
    if (format == null) {
      const interpolate = values[key];
      if (interpolate == null) {
        throw Error(`Missing interpolation value for key ${key}`);
      } else {
        return interpolate as string;
      }
    } else {
      const formatter = formatters[format];
      if (formatter == null) {
        throw Error(`Missing formatter for ${format}`);
      } else {
        const interpolate = values[key];
        if (interpolate == null) {
          throw Error(`Missing interpolation value for key ${key}`);
        } else {
          return formatter(interpolate, config);
        }
      }
    }
  });

  return interpolatedString;
}

function extractPluralKey(
  namespaces: LabelNamespace<any>,
  key: string,
  count: number,
  locale: string
) {
  const pluralization = new Intl.PluralRules(locale);
  const pluralForm = pluralization.select(count);

  const exactCountKey = `${key}_${count}`;
  const pluralKey = `${key}_${pluralForm}`;

  if (namespaces[exactCountKey] != null) {
    return exactCountKey;
  } else if (namespaces[pluralKey] != null) {
    return pluralKey;
  } else {
    return null;
  }
}

function extractPossibleNamespace(key: string, defaultNamespace: string) {
  if (key.includes(":")) {
    return {
      namespace: key.split(":")[0],
      key: key.split(":")[1],
    };
  } else {
    return {
      namespace: defaultNamespace,
      key,
    };
  }
}

export function LocalizationCore<T extends keyof I18nNamespaces>({
  defaultNamespace,
  locale: localeConfig,
  namespaces,
}: {
  defaultNamespace: T;
  namespaces: LocaleNamespaces;
  locale: LocaleConfig;
}) {
  const t = (
    key: keyof I18nNamespaces[T],
    interpolationValue: Record<string, string | number> | null = null,
    options?: {}
  ) => {
    // key could be in form of 'ns:key' eg. "common:hello"
    let { key: tKey, namespace: tNSKey } = extractPossibleNamespace(
      key as string,
      defaultNamespace
    );
    const nsDictionary = (namespaces as any)[tNSKey];

    if (interpolationValue == null) {
      const value = nsDictionary[tKey];
      if (value == null) {
        throw Error(`Missing translation for key ${key as string}`);
      } else {
        return value;
      }
    } else {
      // attempt to check if plural form exists
      if (interpolationValue["count"] != null) {
        const pluralCount = Number(interpolationValue.count);
        const possiblePluralKey = extractPluralKey(
          nsDictionary,
          tKey,
          pluralCount,
          localeConfig.languageCode
        );
        if (possiblePluralKey) tKey = possiblePluralKey;
      }

      // interpolate values with formatting
      const rawText = nsDictionary[tKey];

      if (typeof rawText === "object") {
        throw Error(`Nested translation value is not supported!`);
      } else if (rawText == null) {
        throw Error(`Missing translation for key ${key as string}`);
      }

      return interpolation(rawText, interpolationValue, localeConfig);
    }
  };

  return { t };
}

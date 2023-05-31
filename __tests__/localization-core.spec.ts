import { describe, expect, it } from "vitest";
import { LocalizationCore } from "../components/core";

describe("localization-core", () => {
  it("simple variable interpolation", () => {
    const { t } = LocalizationCore({
      defaultNamespace: "default",
      locale: { languageCode: "en", currency: "USD" },
      namespaces: {
        default: {
          hello: "Hello {{name}}, good {{event}}",
        },
      },
    });

    const result = t("hello", { name: "John", event: "morning" });

    expect(result).toBe("Hello John, good morning");
  });

  it("pluralization", () => {
    const { t } = LocalizationCore({
      defaultNamespace: "default",
      locale: {
        languageCode: "en",
        currency: "USD",
      },
      namespaces: {
        default: {
          apple: "There is apple",
          apple_one: "There is {{count}} apple",
          apple_other: "There are {{count}} apples",
          orange_3: "There are 3 oranges",
        },
      },
    });

    const result = t("apple", { count: 3 });
    expect(result).toBe("There are 3 apples");

    const result2 = t("orange", { count: 3 });
    expect(result2).toBe("There are 3 oranges");

    const result3 = t("apple");
    expect(result3).toBe("There is apple");
  });

  it("formatter-currency", () => {
    const { t } = LocalizationCore({
      defaultNamespace: "default",
      locale: {
        languageCode: "en",
        currency: "USD",
      },
      namespaces: {
        default: {
          price: "Price is {{price, currency}}",
        },
      },
    });

    const result = t("price", { price: 1000 });
    expect(result).toBe("Price is $1,000");
  });
});

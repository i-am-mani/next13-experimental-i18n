import * as React from "react";
import { loadNamespacesFromCache } from "../../components/initializer";
import { I18nConfigurations } from "../../i18n";
import { useTranslation } from "../../components/useTranslation";
import { I18nProvider } from "../../components/I18nProvider";
import { IndexClientComponent } from "./IndexClientComponent";

export default async function Page({ params }: { params: { locale: string } }) {
  console.log(params);

  const translations = await loadNamespacesFromCache(
    [...I18nConfigurations.pages.common, ...I18nConfigurations.pages.index],
    params.locale
  );
  const { t } = useTranslation("index");

  return (
    <div>
      <div className="text-3xl font-semibold">{t("first_page_title")}</div>
      <I18nProvider namespaces={translations}>
        <IndexClientComponent />
      </I18nProvider>
    </div>
  );
}

import * as React from "react";
import { I18nProvider } from "../../../components/I18nProvider";
import { ClientComponent } from "./ClientComponent";
import { ServerComponent } from "./ServerComponent";
import { I18nConfigurations } from "../../../i18n";
import { loadNamespacesFromCache } from "../../../components/initializer";
import { useTranslation } from "../../../components/useTranslation";

export default async function Page({ params }: { params: { locale: string } }) {
  const translations = await loadNamespacesFromCache(
    [...I18nConfigurations.pages.common, ...I18nConfigurations.pages.feature1],
    params.locale
  );
  const { t } = useTranslation("common");

  return (
    <div>
      {/* Top level usage of translate */}
      <p className="mb-8 text-4xl font-semibold">{t("website_title")}</p>

      <div className="flex gap-4">
        <ServerComponent />
        <I18nProvider namespaces={translations}>
          <ClientComponent />
        </I18nProvider>
      </div>
    </div>
  );
}
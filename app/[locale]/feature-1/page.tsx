import * as React from "react";
import { ClientComponent } from "./ClientComponent";
import { ServerComponent } from "./ServerComponent";
import { I18nPageWrapper } from "../../I18nPageWrapper";
import { useTranslation } from "../../../components/useTranslation";

function Title() {
  const { t } = useTranslation("common");
  return <p className="mb-8 text-4xl font-semibold">{t("website_title")}</p>;
}

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <I18nPageWrapper locale={params.locale} pathname={"feature1"}>
        <div>
          {/* Top level usage of translate */}
          <Title />

          <div className="flex gap-4">
            <ServerComponent />
            <ClientComponent />
          </div>
        </div>
      </I18nPageWrapper>
    </>
  );
}

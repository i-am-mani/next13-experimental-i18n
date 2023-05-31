import * as React from "react";
import { IndexClientComponent } from "./IndexClientComponent";
import { I18nPageWrapper } from "../I18nPageWrapper";
import { useTranslation } from "../../components/useTranslation";

function Title() {
  const { t } = useTranslation("index");
  return <div className="text-3xl font-semibold">{t("first_page_title")}</div>;
}

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <I18nPageWrapper locale={params.locale} pathname={"index"}>
        <Title />
        <IndexClientComponent />
      </I18nPageWrapper>
    </div>
  );
}

"use client";
import * as React from "react";
import { useTranslation } from "../../components/useTranslation";
import IntlMessageFormat from "intl-messageformat";

export function IndexClientComponent() {
  const { t } = useTranslation("index");
  return (
    <div>
      <div>{t("client_label")}</div>
    </div>
  );
}

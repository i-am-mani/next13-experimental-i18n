"use client";
import * as React from "react";
import { useTranslation } from "../../components/useTranslation";

export function IndexClientComponent() {
  const { t } = useTranslation("index");
  return (
    <div>
      <div>{t("client_label")}</div>
    </div>
  );
}

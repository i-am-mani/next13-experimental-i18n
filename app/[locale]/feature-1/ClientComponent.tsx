"use client";
import * as React from "react";
import { useTranslation } from "../../../components/useTranslation";

export function ClientComponent() {
  const { t } = useTranslation("feature1");
  return (
    <div className="w-80 h-80 rounded-md bg-lime-500 text-white flex justify-center items-center">
      <div>{t("client_label")}</div>
    </div>
  );
}

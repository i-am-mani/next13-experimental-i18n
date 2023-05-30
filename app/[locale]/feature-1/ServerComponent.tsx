import * as React from "react";
import { useTranslation } from "../../../components/useTranslation";

export function ServerComponent() {
  const { t } = useTranslation("feature1");
  return (
    <div className="w-80 h-80 rounded-md bg-blue-400 text-white flex justify-center items-center">
      <div>{t("server_label")}</div>
    </div>
  );
}

import * as React from "react";
import { useTranslation } from "../../../components/useTranslation";

export function ServerComponent() {
  const { t } = useTranslation("feature1");
  return (
    <div className="w-80 min-h-full p-3 rounded-md bg-blue-400 text-white flex justify-center items-center">
      <div className="flex flex-col mx-6 gap-y-3">
        <div>{t("server_label")}</div>

        <div className="border  p-2">
          <div className="text-sm text-slate-600 font-semibold">{'t("server_variable_key", { name: "John" })'}</div>
          <div>{t("server_variable_key", { name: "John" })}</div>
        </div>

        <div className="border  p-2">
          <p className="text-sm text-slate-600 font-semibold">{`t("pluralization", { count: 0 })`}</p>
          <div>{t("pluralization", { count: 0 })}</div>
        </div>

        <div className="border  p-2">
          <div className="text-sm text-slate-600 font-semibold">{'t("cart", { count: 1 })'}</div>
          <div>{t("cart", { count: 1 })}</div>
        </div>

        <div className="border  p-2">
          <div className="text-sm text-slate-600 font-semibold">{'t("cart", { count: 9 })'}</div>
          <div>{t("cart", { count: 9 })}</div>
        </div>
      </div>
    </div>
  );
}

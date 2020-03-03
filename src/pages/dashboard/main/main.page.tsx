import React from "react";
import { useTranslation } from "react-i18next";

const MainDash: React.FC<any> = props => {
  const { t } = useTranslation();
  return <p>{t("dashboard.1")}</p>;
};

export default MainDash;

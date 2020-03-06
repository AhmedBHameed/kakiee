import React from "react";
import { useTranslation } from "react-i18next";
import Content from "../../../pages/kakiee/components/content/content";
// import classes from "*.module.css";
import { useStyle } from "./style.main";

const MainDash: React.FC<any> = props => {
  const classes = useStyle();
  const { t } = useTranslation();
  return (
    <Content
      classes={{
        container: classes.container
      }}
    >
      <p>{t("dashboard.1")}</p>
    </Content>
  );
};

export default MainDash;

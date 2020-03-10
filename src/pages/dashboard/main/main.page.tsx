import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import clsx from "clsx";
// import { useDispatch, useSelector } from "react-redux";
// import Content from "../../components/content/content";
// // import classes from "*.module.css";
// import { useStyle } from "./style.main";
// import { IInitAppState } from "../../../@lib/store/kakiee/rootReducer";
// import { AppBarComponent, AppDrawer } from "../../../@lib/components";
// // import { SettingsApplications, SupervisorAccount } from "@material-ui/icons";
// import { ROUTER } from "../../../config";
// import { resetAppState } from "../../../@lib/store/kakiee/actions";
// import { removeToken, getToken } from "../../../@lib/util";
// import { Dashboard } from "@material-ui/icons";
// import NavbarAside from "../../components/navbar-aside/navbar-aside";
// import { useGlobalStyle } from "../../../@lib/styles/lib.style";
// import { IUserProfileState } from "../../../@lib/store/kakiee/reducers";

const MainDash: React.FC<RouteComponentProps<any>> = props => {
  const { t } = useTranslation();
  return <h1>DASHBOARD MAIN PAGE</h1>;
};

export default MainDash;

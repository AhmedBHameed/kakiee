import React from "react";
import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core/styles";
import { MimTheme, DarkTheme } from "../styles/app.style";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Notification } from "../@lib/components/notification/notification";
import { ROUTER } from "../config";
import AccessPage from "../pages/access/access.page";
import Kakiee from "../pages/kakiee/kakiee.page";
import { useGlobalStyle } from "../@lib/styles/lib.style";
import { IStore } from "../models";
import Protected from "../pages/protected/protected";
import { useStyle } from "./style.routes";

const Wrapper: React.FC<any> = () => {
  const gStyles = useGlobalStyle();
  const notify = useSelector(
    (state: IStore.IAppState) => state.notificationMsg
  );
  const themeType = useSelector((state: IStore.IAppState) => state.themeType);
  const classes = useStyle();

  return (
    <ThemeProvider theme={themeType === "light" ? MimTheme : DarkTheme}>
      <div
        className={clsx(
          gStyles.h100,
          themeType === "light"
            ? classes.backgroundLightColor
            : classes.backgroundDarkColor
        )}
      >
        <Switch>
          <Route
            path={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
            render={props => (
              <Protected
                importedComponent={import("../pages/dashboard/dashboard.page")}
                onFailRedirectTo={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
                {...props}
              />
            )}
          />
          <Route
            path={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}`}
            component={AccessPage}
          />
          <Route path={`${ROUTER.ROOT.path}`} exact component={Kakiee} />
        </Switch>
      </div>
      <Notification
        variant={notify.type === "success" ? "success" : "error"}
        open={!!notify.open}
        message={notify.message || ""}
        direction={{
          vertical: "bottom",
          horizontal: "right"
        }}
      />
    </ThemeProvider>
  );
};
export default Wrapper;

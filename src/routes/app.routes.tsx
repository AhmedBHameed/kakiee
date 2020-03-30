import React, { useMemo } from "react";
import clsx from "clsx";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeOptions
} from "@material-ui/core/styles";
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
import { useThemeSwitcher } from "@lib/services/theme-swither/theme-switcher.service";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";

const LightTheme: ThemeOptions = {
  palette: {
    type: "light",
    background: {
      default: "#fafafa"
    },
    primary: grey,
    secondary: {
      main: "#228896"
    },
    text: {
      primary: "#000",
      secondary: grey["600"]
    },
    error: red
  }
};
const DarkTheme: ThemeOptions = {
  palette: {
    type: "dark",
    background: {
      default: blueGrey["900"]
    },
    primary: blueGrey,
    secondary: teal,
    text: {
      primary: "#fff",
      secondary: grey["400"]
    }
  }
};

const Wrapper: React.FC<any> = () => {
  const gStyles = useGlobalStyle();
  const classes = useStyle();

  const notify = useSelector(
    (state: IStore.IAppState) => state.notificationMsg
  );

  const { theme, handleToggleTheme } = useThemeSwitcher({
    LightTheme,
    DarkTheme
  });
  const appTheme = createMuiTheme(theme);

  const memoRoutes = useMemo(
    () => (
      <Switch>
        <Route
          path={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
          render={props => (
            <Protected
              importedComponent={import("../pages/dashboard/dashboard.page")}
              onFailRedirectTo={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
              {...props}
              data={{ handleToggleTheme }}
            />
          )}
        />
        <Route
          path={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}`}
          component={AccessPage}
        />
        <Route
          path={`${ROUTER.ROOT.path}`}
          exact
          component={props => (
            <Kakiee handleToggleTheme={handleToggleTheme} {...props} />
          )}
        />
      </Switch>
    ),
    [handleToggleTheme]
  );

  return (
    <MuiThemeProvider theme={appTheme}>
      <div
        className={clsx(
          gStyles.h100,
          classes.root,
          appTheme.palette.type === "light"
            ? classes.backgroundLightColor
            : classes.backgroundDarkColor
        )}
      >
        {memoRoutes}
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
    </MuiThemeProvider>
  );
};
export default Wrapper;

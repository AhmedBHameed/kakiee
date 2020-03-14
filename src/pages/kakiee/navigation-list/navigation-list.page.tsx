import React, { useCallback, SyntheticEvent, useState } from "react";
import { RouteComponentProps, NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { getToken } from "../../../@lib/util";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyle } from "./style.navigation-list";
import { IconButton } from "@material-ui/core";
import { changeAppTheme } from "../../../@lib/store/kakiee/actions";
import { ROUTER } from "../../../config";
import { WbSunny, NightsStay } from "@material-ui/icons";

type IDashboardNavigation = {
  handleLogout?: (e: SyntheticEvent) => boolean;
};

const NavigationList: React.FC<RouteComponentProps<any> &
  IDashboardNavigation> = ({ handleLogout }) => {
  const classes = useStyle();
  const gStyle = useGlobalStyle();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  const scrollTop = useCallback((match, location) => {
    if (!!match) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    return match;
  }, []);

  const themeTogle = useCallback(() => {
    const currentTheme = theme === "light" ? "dark" : "light";
    setTheme(currentTheme);
    dispatch(changeAppTheme(currentTheme));
  }, [theme, dispatch]);

  return (
    <ul className={clsx(classes.list, gStyle.txtCenter)}>
      {/* {(user?.isAdmin || user?.isSuper) && (
        <li>
          <NavLink
            className={classes.links}
            activeClassName={classes.activeLink}
            to={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
            exact
          >
            {t("menu.dashboard")}
          </NavLink>
        </li>
      )} */}
      <li>
        <NavLink
          isActive={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${ROUTER.ROOT.path}/`}
          exact
        >
          BLOG
        </NavLink>
      </li>
      <li>
        <NavLink
          isActive={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${ROUTER.ROOT.path}/${ROUTER.ABOUT.path}`}
          exact
        >
          ABOUT
        </NavLink>
      </li>
      <li>
        <NavLink
          isActive={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${ROUTER.ROOT.path}/${ROUTER.CONTACT.path}`}
          exact
        >
          CONTACT US
        </NavLink>
      </li>
      {getToken("kakieeToken") ? (
        <li>
          <Link
            className={classes.links}
            onClick={handleLogout}
            to={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
          >
            LOGOUT
          </Link>
        </li>
      ) : (
        <li>
          <Link
            className={classes.links}
            to={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
          >
            LOGIN
          </Link>
        </li>
      )}
      <li>
        <IconButton onClick={() => themeTogle()} aria-label="Menu">
          {theme === "light" ? (
            <NightsStay fontSize="large" />
          ) : (
            <WbSunny fontSize="large" />
          )}
        </IconButton>
      </li>
    </ul>
  );
};

export default NavigationList;

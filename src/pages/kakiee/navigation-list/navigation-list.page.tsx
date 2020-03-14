import React, { useCallback, SyntheticEvent, useState } from "react";
import { RouteComponentProps, NavLink, Link, match } from "react-router-dom";
import clsx from "clsx";
import { getToken } from "../../../@lib/util";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyle } from "./style.navigation-list";
import { ROUTER } from "../../../config";
import { ThemeSwitch } from "../../components";

type IDashboardNavigation = {
  handleLogout?: (e: SyntheticEvent) => boolean;
};

const NavigationList: React.FC<RouteComponentProps<any> &
  IDashboardNavigation> = ({ handleLogout }) => {
  const classes = useStyle();
  const gStyle = useGlobalStyle();

  const isActive = useCallback((match: match<any>) => !!match?.isExact, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

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
          isActive={isActive}
          onClick={scrollTop}
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
          isActive={isActive}
          onClick={scrollTop}
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
          isActive={isActive}
          onClick={scrollTop}
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
        <ThemeSwitch />
      </li>
    </ul>
  );
};

export default NavigationList;

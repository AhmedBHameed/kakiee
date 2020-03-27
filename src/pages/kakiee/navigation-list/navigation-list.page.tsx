import React, { useCallback, SyntheticEvent } from "react";
import { RouteComponentProps, NavLink, Link, match } from "react-router-dom";
import clsx from "clsx";
import { getToken } from "../../../@lib/util";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyle } from "./style.navigation-list";
import { ROUTER } from "../../../config";
import { ThemeSwitch } from "../../components";
import { useTranslation } from "react-i18next";

type IDashboardNavigation = {
  handleLogout?: (e: SyntheticEvent) => boolean;
  handleToggleTheme: () => void;
};

const NavigationList: React.FC<RouteComponentProps<any> &
  IDashboardNavigation> = ({ handleLogout, handleToggleTheme }) => {
  const classes = useStyle();
  const gStyle = useGlobalStyle();
  const { t } = useTranslation();

  const isActive = useCallback((m: match<any>) => !!m?.isExact, []);

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
        {/* <NavLink
          isActive={isActive}
          onClick={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${ROUTER.ROOT.path}/${ROUTER.BLOGS.path}`}
          exact
        >
          BLOG
        </NavLink> */}
        <span className={classes.links}>{t("menu.blog")}</span>
      </li>
      <li>
        <NavLink
          isActive={isActive}
          onClick={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${ROUTER.ROOT.path}/`}
          exact
        >
          {t("menu.about")}
        </NavLink>
      </li>
      <li>
        <NavLink
          isActive={isActive}
          onClick={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${ROUTER.ROOT.path}/${ROUTER.HIREME.path}`}
          exact
        >
          {t("menu.hireMe")}
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
          {t("menu.contactMe")}
        </NavLink>
      </li>
      {getToken("kakieeToken") ? (
        <li>
          <Link
            className={classes.links}
            onClick={handleLogout}
            to={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
          >
            {t("menu.logout")}
          </Link>
        </li>
      ) : (
        <li>
          <Link
            className={classes.links}
            to={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
          >
            {t("menu.login")}
          </Link>
        </li>
      )}
      <li>
        <ThemeSwitch onToggleTheme={handleToggleTheme} />
      </li>
    </ul>
  );
};

export default NavigationList;

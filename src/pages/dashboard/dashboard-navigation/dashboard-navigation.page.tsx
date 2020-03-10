import React, { useCallback, SyntheticEvent } from "react";
import { RouteComponentProps, NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ROUTER } from "../../../config";
import { getToken } from "../../../@lib/util";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
// import { IUserProfileState } from "../../../@lib/store/kakiee/reducers";
import { useStyle } from "./style.dashboard-navigation";

type IDashboardNavigation = {
  // user?: IUserProfileState;
  handleLogout?: (e: SyntheticEvent) => boolean;
};

const DashboardNavigation: React.FC<RouteComponentProps<any> &
  IDashboardNavigation> = ({ handleLogout, match }) => {
  const classes = useStyle();
  const gStyle = useGlobalStyle();
  const { t } = useTranslation();

  const scrollTop = useCallback((match, location) => {
    if (!!match) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    return match;
  }, []);

  return (
    <ul className={clsx(classes.list, gStyle.txtCenter)}>
      {!!getToken("kakieeToken") && (
        <li>
          <NavLink
            className={classes.links}
            activeClassName={classes.activeLink}
            to={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
            exact
          >
            {t("dashbaord.asideMenu.main")}
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          isActive={scrollTop}
          className={classes.links}
          activeClassName={classes.activeLink}
          to={`${match.path}/${ROUTER.ARTICALS.path}`}
          exact
        >
          {t("dashbaord.asideMenu.articals")}
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
    </ul>
  );
};

export default DashboardNavigation;

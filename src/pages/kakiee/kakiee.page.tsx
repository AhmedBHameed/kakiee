import React, { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import {
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { useGlobalStyle } from "../../@lib/styles/lib.style";
import { useStyles } from "./style.kakiee";
import { Link, RouteComponentProps, NavLink, Route } from "react-router-dom";
import { ROUTER } from "config";
import { LinkedIn, GitHub, Email, Menu } from "@material-ui/icons";
import Contact from "./contact/contact";
import Blog from "./blog/blog";
import About from "./about/about";
import Dashboard from "../dashboard/dashboard";
import { ReactComponent as Heart } from "../../static/heart.svg";
import { useTranslation } from "react-i18next";
import { getToken } from "../../@lib/util";

const Kakiee: React.FC<RouteComponentProps<any>> = props => {
  const gStyle = useGlobalStyle();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [toggleOpt, setToggleOpt] = useState({
    isSmallScreen: isSmScreen,
    open: false
  });
  const toggleMenu = useCallback(
    (toggle: boolean = false) => {
      setToggleOpt(s => ({
        ...s,
        open: toggle
      }));
    },
    [setToggleOpt]
  );

  const scrollTop = useCallback((match, location) => {
    if (!!match) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    return match;
  }, []);

  useEffect(() => {
    if (isSmScreen) {
      setToggleOpt(s => ({
        isSmallScreen: isSmScreen,
        open: false
      }));
    } else {
      setToggleOpt(s => ({
        ...s,
        isSmallScreen: isSmScreen
      }));
    }
  }, [setToggleOpt, isSmScreen]);

  return (
    <div className={clsx([gStyle.w100, classes.container])}>
      <aside
        className={clsx(classes.aside, toggleOpt.open ? classes.asideOpen : "")}
      >
        <Grid
          container
          direction="row"
          justify="center"
          className={clsx(gStyle.h100, classes.navMargin)}
        >
          <Grid item>
            <Typography variant="h3" gutterBottom className={classes.bold}>
              {t("menu.kakiee")}
            </Typography>
            <ul className={clsx(classes.list, gStyle.txtCenter)}>
              {!!getToken() && (
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
              )}
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
              <li>
                <Link
                  className={classes.links}
                  to={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
                >
                  LOGIN
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <div
          className={clsx(classes.copyRights, gStyle.w100, gStyle.txtCenter)}
        >
          <Typography variant="caption" display="block" gutterBottom>
            © 2020 kakiee.at, All Rights Reserved.
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Design with <Heart className={classes.heartColor} /> by&nbsp;
            <span className={classes.nameColor}>Ahmed Hameed</span>
          </Typography>
          <div>
            <IconButton
              target="blank"
              href="https://www.linkedin.com/in/ahmed-hameed-185b3612b/"
              size="small"
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
            {/* <IconButton
              target="blank"
              href="https://www.linkedin.com/in/ahmed-hameed-185b3612b/"
              size="small"
              aria-label="facebook"
            >
              <Facebook />
            </IconButton> */}
            {/* <IconButton
              target="blank"
              href="https://www.linkedin.com/in/ahmed-hameed-185b3612b/"
              size="small"
              aria-label="twitter"
            >
              <Twitter />
            </IconButton> */}
            <IconButton
              target="blank"
              href="https://github.com/AhmedBHameed"
              size="small"
              aria-label="Github"
            >
              <GitHub />
            </IconButton>
            <IconButton size="small" aria-label="ahmedbazy@gmail.com">
              <a
                className={classes.iconLinks}
                href="mailto:contact.kakiee@gmail.com"
              >
                <Email />
              </a>
            </IconButton>
          </div>
        </div>
      </aside>
      <div
        className={clsx(classes.main, toggleOpt.open ? classes.mainShrink : "")}
      >
        {isSmScreen && (
          <IconButton
            onClick={() => toggleMenu(!toggleOpt.open)}
            className={classes.burggerMenu}
            aria-label="Menu"
          >
            <Menu fontSize="large" />
          </IconButton>
        )}
        <Route
          path={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
          exact
          render={props => <Dashboard {...props} />}
        />
        <Route
          path={`${ROUTER.ROOT.path}/`}
          exact
          render={props => <Blog {...props} />}
        />
        <Route
          path={`${ROUTER.ROOT.path}/${ROUTER.CONTACT.path}`}
          exact
          render={props => <Contact {...props} />}
        />
        <Route
          path={`${ROUTER.ROOT.path}/${ROUTER.ABOUT.path}`}
          exact
          render={props => <About {...props} />}
        />
      </div>
    </div>
  );
};

export default Kakiee;

import React, { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import {
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyles } from "./style.navbar-aside";
import { RouteComponentProps } from "react-router-dom";

import { Menu } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

interface INavbarAside {
  children: any;
  translation?: any;
  menuComponent: React.ReactElement<any>;
  footerComponent?: React.ReactElement<any>;
}

const NavbarAside: React.FC<RouteComponentProps<any> & INavbarAside> = ({
  children,
  menuComponent,
  footerComponent
}) => {
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
            <Typography
              variant="h3"
              gutterBottom
              className={clsx(classes.bold, gStyle["margin-bottom-5"])}
            >
              {t("menu.kakiee")}
            </Typography>
            {menuComponent}
          </Grid>
        </Grid>
        {!!footerComponent ? footerComponent : ""}
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
        {children}
      </div>
    </div>
  );
};

export default NavbarAside;

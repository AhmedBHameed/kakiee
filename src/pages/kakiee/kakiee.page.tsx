import React from "react";
import clsx from "clsx";
import { Typography, IconButton } from "@material-ui/core";
import { useGlobalStyle } from "../../@lib/styles/lib.style";
import { useStyles } from "./style.kakiee";
import { RouteComponentProps, Route } from "react-router-dom";
import { ROUTER } from "config";
import { LinkedIn, GitHub, Email } from "@material-ui/icons";
import Contact from "./contact/contact";
import Blog from "./blog/blog";
import About from "./about/about";
import HireMe from "./hire-me/hire-me";
import { ReactComponent as Heart } from "../../static/heart.svg";
import NavbarAside from "../components/navbar-aside/navbar-aside";
import NavigationList from "./navigation-list/navigation-list.page";
import { useTranslation } from "react-i18next";

const Footer: React.FC<any> = () => {
  const gStyle = useGlobalStyle();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.copyRights, gStyle.w100, gStyle.txtCenter)}>
      <Typography variant="caption" display="block" gutterBottom>
        {t("footer.line1")}
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        {t("footer.line2.made")}&nbsp;
        <Heart className={classes.heartColor} />
        &nbsp;{t("footer.line2.by")}&nbsp;
        <span className={classes.nameColor}>{t("footer.line2.owner")}</span>
      </Typography>
      <div>
        <IconButton
          target="blank"
          href={t("footer.socialLinks.linkedin")}
          size="small"
          aria-label="LinkedIn"
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          target="blank"
          href={t("footer.socialLinks.github")}
          size="small"
          aria-label="Github"
        >
          <GitHub />
        </IconButton>
        <IconButton size="small" aria-label={t("footer.socialLinks.email")}>
          <a className={classes.iconLinks} href={t("footer.socialLinks.email")}>
            <Email />
          </a>
        </IconButton>
      </div>
    </div>
  );
};

const Kakiee: React.FC<RouteComponentProps<any> & {
  handleToggleTheme: () => void;
}> = kakieeProps => (
  <NavbarAside
    menuComponent={
      <NavigationList
        handleToggleTheme={kakieeProps.handleToggleTheme}
        {...kakieeProps}
      />
    }
    footerComponent={<Footer />}
    {...kakieeProps}
  >
    <Route
      path={`${ROUTER.ROOT.path}/`}
      exact
      render={props => <Blog {...props} />}
    />
    <Route
      path={`${ROUTER.ROOT.path}/${ROUTER.ABOUT.path}`}
      exact
      render={props => <About {...props} />}
    />
    <Route
      path={`${ROUTER.ROOT.path}/${ROUTER.HIREME.path}`}
      exact
      render={props => <HireMe {...props} />}
    />
    <Route
      path={`${ROUTER.ROOT.path}/${ROUTER.CONTACT.path}`}
      exact
      render={props => <Contact {...props} />}
    />
  </NavbarAside>
);

export default Kakiee;

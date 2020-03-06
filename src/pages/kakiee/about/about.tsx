import React, { useRef, useEffect } from "react";
import { TimelineLite, Power4 } from "gsap";
import clsx from "clsx";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as Settings } from "../../../static/settings.svg";
import { ReactComponent as Planning } from "../../../static/planning.svg";
import { ReactComponent as Optimization } from "../../../static/optimization.svg";
import { ReactComponent as Consulting } from "../../../static/consulting.svg";
import { useStyle } from "./style.about";
import { ReactComponent as Mysvg } from "../../../static/mysvg.svg";
import Content from "../components/content/content";
import Service from "../components/service/service";
import { ROUTER } from "../../../config";
import { useAppStyle } from "../../../styles/app.style";
import { useTranslation } from "react-i18next";

const About: React.FC<any> = props => {
  const gStyles = useGlobalStyle();
  const appStyles = useAppStyle();
  const classes = useStyle();
  const { t } = useTranslation();

  const mySvg = useRef<HTMLObjectElement | any>(null);
  const captionEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!!mySvg && !!mySvg.current) {
      const thenAnimate = new TimelineLite();
      thenAnimate.to(
        mySvg.current,
        3,
        {
          x: "15%",
          opacity: 1,
          ease: Power4.easeInOut
        },
        0.2
      );
      const thenAnimate2 = new TimelineLite();
      thenAnimate2.to(
        captionEl.current,
        3,
        {
          x: "-50%",
          opacity: 1,
          ease: Power4.easeInOut
        },
        0.5
      );
    }
  }, [mySvg]);

  return (
    <>
      <div className={classes.container}>
        <Mysvg ref={mySvg} className={classes.ahmedSvg} />
        <div className={classes.captions} ref={captionEl}>
          <Typography variant="h4" gutterBottom className={clsx(classes.hi)}>
            {t("about.myname")}
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            className={clsx(classes.myName)}
          >
            {t("about.ahmedhameed")}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            className={clsx(classes.founder)}
          >
            {t("about.founder")}
          </Typography>
        </div>
      </div>
      <Content>
        <Grid item xs={12} className={appStyles.sectionSpacingTop}>
          <Typography variant="h6" className={classes.sectionOpt} gutterBottom>
            {t("about.aboutKakiee")}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={clsx(classes.subtitleColor, classes.sectionOpt)}
          >
            {t("about.introduction")}
          </Typography>
        </Grid>
        <Grid item xs={12} className={appStyles.sectionSpacingTop}>
          <Typography variant="h6" className={classes.sectionOpt} gutterBottom>
            {t("about.whatIDo")}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Service
              Icon={Settings}
              headerTxt={t("about.services.1.title")}
              bodyTxt={t("about.services.1.caption")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Service
              Icon={Planning}
              headerTxt={t("about.services.2.title")}
              bodyTxt={t("about.services.2.caption")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Service
              Icon={Optimization}
              headerTxt={t("about.services.3.title")}
              bodyTxt={t("about.services.3.caption")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Service
              Icon={Consulting}
              headerTxt={t("about.services.4.title")}
              bodyTxt={t("about.services.4.caption")}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={clsx(appStyles.sectionSpacingTop, gStyles["margin-top-5"])}
        >
          <Typography variant="h6" className={classes.sectionOpt} gutterBottom>
            {t("about.contactMe")}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={clsx(classes.subtitleColor, classes.sectionOpt)}
          >
            {t("about.contactSubtitle")}
          </Typography>
          <Link className={classes.contactMe} to={`${ROUTER.CONTACT.path}`}>
            <Button
              variant="contained"
              color="secondary"
              className={gStyles["margin-bottom-5"]}
            >
              {t("about.contactMe")}
            </Button>
          </Link>
        </Grid>
      </Content>
    </>
  );
};

export default About;

import React, { useRef, useEffect } from "react";
import { TimelineLite, Power4 } from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import clsx from "clsx";
import { useGlobalStyle } from "@lib/styles/lib.style";
import { Typography, Grid, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as Settings } from "../../../static/settings.svg";
import Content from "../../components/content/content";
import Service from "../../components/service/service";
import { ROUTER } from "../../../config";
import { useTranslation } from "react-i18next";
import { ReactComponent as PStructureSvg } from "../../../static/project_structure.svg";
import { ReactComponent as ApiSvg } from "../../../static/api.svg";
import { ReactComponent as DockerSvg } from "../../../static/docker.svg";
import { useStyle } from "./style.hire-me";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

const C = CSSPlugin; // eslint-disable-line

const HireMe: React.FC<any> = props => {
  const classes = useStyle();
  const gStyles = useGlobalStyle();
  const { t } = useTranslation();

  const projectSvg = useRef<HTMLObjectElement | any>(null);
  const captionEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!!projectSvg && !!projectSvg.current) {
      const thenAnimate = new TimelineLite();
      thenAnimate.to(
        projectSvg.current,
        3,
        {
          x: "0",
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
          x: "0",
          opacity: 1,
          ease: Power4.easeInOut
        },
        0.5
      );
      const thenAnimate3 = new TimelineLite();
      const iterateAnimation = (el: SVGRectElement, i: number) => {
        thenAnimate3.to(
          el,
          3,
          {
            opacity: 1,
            ease: Power4.easeInOut
          },
          !!i ? i * 0.3 + 2 : 2
        );
      };
      projectSvg.current.querySelectorAll("rect").forEach(iterateAnimation);
    }
  }, [projectSvg, captionEl]);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Content classes={{ container: classes.container }}>
          <Typography
            ref={captionEl}
            variant="h4"
            gutterBottom
            className={clsx(classes.planTitle, gStyles["margin-bottom-5"])}
          >
            {t("hireMe.headerSection.title")}
          </Typography>
          <div ref={projectSvg} className={classes.svgContainer}>
            <PStructureSvg />
          </div>
        </Content>
      </div>

      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid
            item
            xs={12}
            className={clsx(
              gStyles["margin-top-5"],
              gStyles["margin-bottom-5"]
            )}
          >
            <Typography variant="h6" gutterBottom>
              {t("hireMe.offers.title")}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={4}
          >
            <Grid item xs={12} md={6}>
              <Service
                Icon={ApiSvg}
                headerTxt={t("hireMe.offers.services.1.title")}
                bodyTxt={t("hireMe.offers.services.1.subtitle")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Service
                Icon={Settings}
                headerTxt={t("hireMe.offers.services.2.title")}
                bodyTxt={t("hireMe.offers.services.2.subtitle")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Service
                Icon={DockerSvg}
                headerTxt={t("hireMe.offers.services.3.title")}
                bodyTxt={t("hireMe.offers.services.3.subtitle")}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={gStyles["margin-top-5"]}>
            <Typography variant="h6" gutterBottom>
              {t("hireMe.whyHiringMe.title")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            className={clsx(
              gStyles["margin-top-5"],
              gStyles["margin-bottom-5"]
            )}
          >
            <Service
              Icon={FormatQuoteIcon}
              className={classes.serviceContainer}
              headerTxt={t("hireMe.whyHiringMe.quote")}
              bodyTxt={t("hireMe.whyHiringMe.sayer")}
              customClasses={{
                bodyTxtClass: classes.serviceBodyTxtClass
              }}
            />
          </Grid>
          <Grid item xs={12} className={clsx(gStyles["margin-top-3"])}>
            <Link className={classes.contactMe} to={`${ROUTER.CONTACT.path}`}>
              <Button
                variant="contained"
                color="secondary"
                className={clsx(gStyles["margin-bottom-5"], gStyles.w100)}
              >
                {t("hireMe.hireMeBtn")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HireMe;

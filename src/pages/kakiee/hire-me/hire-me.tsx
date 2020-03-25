import React, { useRef, useEffect } from "react";
import { TimelineLite, Power4 } from "gsap";
import clsx from "clsx";
import { useGlobalStyle } from "@lib/styles/lib.style";
import { Typography, Grid, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as Settings } from "../../../static/settings.svg";
import { ReactComponent as Planning } from "../../../static/planning.svg";
import { ReactComponent as Optimization } from "../../../static/optimization.svg";
import { ReactComponent as Consulting } from "../../../static/consulting.svg";
import { ReactComponent as Mysvg } from "../../../static/mysvg.svg";
import Content from "../../components/content/content";
import Service from "../../components/service/service";
import { ROUTER } from "../../../config";
import { useAppStyle } from "../../../styles/app.style";
import { useTranslation } from "react-i18next";
import { ReactComponent as PStructureSvg } from "../../../static/project_structure.svg";
import { ReactComponent as ApiSvg } from "../../../static/api.svg";
import { useStyle } from "./style.hire-me";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

const HireMe: React.FC<any> = props => {
  const classes = useStyle();
  const gStyles = useGlobalStyle();
  const { t } = useTranslation();

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Content classes={{ container: classes.container }}>
          <Typography
            variant="h4"
            gutterBottom
            className={clsx(classes.planTitle, gStyles["margin-bottom-5"])}
          >
            {t("hireMe.headPlanTitle")}
          </Typography>
          <div className={classes.svgContainer}>
            <PStructureSvg />
          </div>
        </Content>
      </div>

      <Container maxWidth="xl">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            className={clsx(
              gStyles["margin-top-5"],
              gStyles["margin-bottom-5"]
            )}
          >
            <Typography
              variant="h6"
              // className={clsx(classes.titleColor, classes.sectionOpt)}
              gutterBottom
            >
              What do I offer as a service ?
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
                Icon={ApiSvg}
                headerTxt={"Back-End"}
                bodyTxt={t("about.services.2.caption")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Service
                Icon={Settings}
                headerTxt={"Front-End"}
                bodyTxt={t("about.services.1.caption")}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={clsx(gStyles["margin-top-5"])}>
            <Typography
              variant="h6"
              // className={clsx(classes.titleColor, classes.sectionOpt)}
              gutterBottom
            >
              Why hiring me ?
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
              bodyTxt={t("hireMe.sayer")}
              headerTxt={t("hireMe.quote")}
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

import React, { useRef, useEffect } from "react";
import { TimelineLite, Power4 } from "gsap";
import clsx from "clsx";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import {
  Typography,
  useTheme,
  Grid,
  Container,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as Settings } from "../../../static/settings.svg";
import { ReactComponent as Planning } from "../../../static/planning.svg";
import { ReactComponent as Optimization } from "../../../static/optimization.svg";
import { ReactComponent as Consulting } from "../../../static/consulting.svg";
import { useStyle } from "./style.about";
import { ReactComponent as Mysvg } from "../../../static/mysvg.svg";
import Service from "../components/service/service";
import { ROUTER } from "../../../config";
import { useAppStyle } from "../../../styles/app.style";

const About: React.FC<any> = props => {
  const gStyles = useGlobalStyle();
  const appStyles = useAppStyle();
  const classes = useStyle();

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
            Hi, my name is
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            className={clsx(classes.myName)}
          >
            Ahmed HAMEED
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            className={clsx(classes.founder)}
          >
            Founder of kakiee.at
          </Typography>
        </div>
      </div>
      <Container maxWidth="xl" className={gStyles["margin-top-5"]}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={gStyles.h100}
        >
          <Grid item xs={12} className={appStyles.sectionSpacingTop}>
            <Typography
              variant="h6"
              className={classes.sectionOpt}
              gutterBottom
            >
              ABOUT KAKIEE
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={clsx(classes.subtitleColor, classes.sectionOpt)}
            >
              KAKIEE is a simple technical blog site for sharing knowledge and
              codes. As a developer and trainer, It is a pleasure to share what
              i've learned, through KAKIEE blog site. It can help other show
              them how to do things in practice. The name comes from kaki fruit
              which I fell in love from first see.
            </Typography>
          </Grid>
          <Grid item xs={12} className={appStyles.sectionSpacingTop}>
            <Typography
              variant="h6"
              className={classes.sectionOpt}
              gutterBottom
            >
              WHAT I DO
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
                headerTxt={"IMPLEMENTATION"}
                bodyTxt={
                  "Converting your design into a web page. Coding is our duty by using the most modern technologies."
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Service
                Icon={Planning}
                headerTxt={"PLANNING"}
                bodyTxt={
                  "Any projects needs a good planning before start coding and by using my experience, you can achieve your project to become reality."
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Service
                Icon={Optimization}
                headerTxt={"OPTIMIZATION"}
                bodyTxt={
                  "Optimization needs a deep understanding of how to do. Using my experience we can lead you into a faster and more reliable performance."
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Service
                Icon={Consulting}
                headerTxt={"CONSULTING AND TRAINING"}
                bodyTxt={
                  "With more than 5 years of experience, consulting and training is one of my services focusing on web technologies."
                }
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            className={clsx(
              appStyles.sectionSpacingTop,
              gStyles["margin-top-5"]
            )}
          >
            <Typography
              variant="h6"
              className={classes.sectionOpt}
              gutterBottom
            >
              CONTACT ME
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={clsx(classes.subtitleColor, classes.sectionOpt)}
            >
              Any type of engagement is required so DO NOT hesitate to contact
              me. Even we can drink a cup of caffee together.
            </Typography>
            <Link className={classes.contactMe} to={`${ROUTER.CONTACT.path}`}>
              <Button
                variant="contained"
                color="secondary"
                className={gStyles["margin-bottom-5"]}
              >
                CONTACT ME
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;

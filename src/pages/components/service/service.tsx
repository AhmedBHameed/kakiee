import React from "react";
import clsx from "clsx";
// import { useGlobalStyle } from "../../../../../@lib/styles/lib.style";
import { Typography } from "@material-ui/core";
import { useStyle } from "./style.service";

interface IAbout {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  headerTxt?: string;
  bodyTxt: string;
  customClasses?: {
    containerClass?: string;
    bodyTxtClass?: string;
  };
}

const Service: React.FC<IAbout> = ({
  bodyTxt,
  headerTxt,
  Icon,
  customClasses
}) => {
  const classes = useStyle();

  return (
    <div className={classes.serviceContainer}>
      <div className={classes.iconContainer}>
        <div className={classes.iconContent}>
          <Icon fontSize="large" className={classes.icon} />
        </div>
      </div>
      <div
        className={clsx(
          classes.captions,
          !!customClasses ? customClasses.containerClass : ""
        )}
      >
        {!!headerTxt && (
          <Typography
            variant="button"
            display="block"
            className={classes.title}
            gutterBottom
          >
            {headerTxt}
          </Typography>
        )}
        <Typography
          variant="subtitle2"
          gutterBottom
          className={
            !!customClasses ? customClasses.bodyTxtClass : classes.subtitleColor
          }
        >
          {bodyTxt}
        </Typography>
      </div>
    </div>
  );
};

export default Service;

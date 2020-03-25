import React from "react";
import clsx from "clsx";
// import { useGlobalStyle } from "../../../../../@lib/styles/lib.style";
import { Typography } from "@material-ui/core";
import { useStyle } from "./style.service";

interface IAbout {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  headerTxt?: string;
  bodyTxt: string;
  className?: string;
  customClasses?: {
    containerClass?: string;
    bodyTxtClass?: string;
    headerTxtClass?: string;
  };
}

const Service: React.FC<IAbout> = ({
  bodyTxt,
  headerTxt,
  className,
  Icon,
  customClasses
}) => {
  const classes = useStyle();

  return (
    <div className={clsx(classes.serviceContainer, className)}>
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
            className={clsx(
              classes.title,
              !!customClasses && customClasses.headerTxtClass
            )}
            gutterBottom
          >
            {headerTxt}
          </Typography>
        )}
        <Typography
          variant="subtitle2"
          gutterBottom
          className={clsx(
            classes.subtitleColor,
            !!customClasses && customClasses.bodyTxtClass
          )}
        >
          {bodyTxt}
        </Typography>
      </div>
    </div>
  );
};

export default Service;

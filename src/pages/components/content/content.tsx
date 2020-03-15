import React from "react";
import clsx from "clsx";
import { Container, Grid } from "@material-ui/core";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";

type IContent = {
  classes?: {
    container?: string;
    grid?: string;
  };
};
const Content: React.FC<IContent> = ({ children, classes = {} }) => {
  const gStyles = useGlobalStyle();

  return (
    <Container
      maxWidth="xl"
      className={clsx(
        !!classes.container ? classes.container : gStyles["margin-top-5"]
      )}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={clsx(!!classes.grid ? classes.grid : gStyles.h100)}
      >
        {children}
      </Grid>
    </Container>
  );
};

export default Content;

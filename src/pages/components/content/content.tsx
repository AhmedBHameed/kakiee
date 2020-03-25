import React from "react";
import clsx from "clsx";
import { Container, Grid } from "@material-ui/core";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyle } from "./style.content";

type IContent = {
  classes?: {
    container?: string;
    grid?: string;
  };
};
const Content: React.FC<IContent> = ({ children, classes = {} }) => {
  const gStyles = useGlobalStyle();
  const styles = useStyle();

  return (
    <Container
      maxWidth="xl"
      className={clsx(
        styles.container,
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

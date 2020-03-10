import React, { useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import { TimelineLite, Power4 } from "gsap";
import { Grid, Button } from "@material-ui/core";
import BlogCard from "../../components/blog-card/blog-card";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useAppStyle } from "../../../styles/app.style";
import { useStyles } from "./style.blog";

const Blog: React.FC<any> = props => {
  const gStyles = useGlobalStyle();
  const appStyle = useAppStyle();
  const classes = useStyles();
  const [articals, setArticals] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1,
    2,
    3,
    123,
    123,
    213,
    123,
    2314,
    2435524
  ]);
  const blogContainer = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setArticals(s => {
      s.push(5, 6, 7, 8);
      return [...s];
    });
  }, [setArticals]);

  useEffect(() => {
    const animation = new TimelineLite();
    if (!!blogContainer && !!blogContainer.current && !!articals.length) {
      const animate = (
        div: ChildNode,
        i: number,
        arr: NodeListOf<ChildNode>
      ) => {
        animation.to(
          div,
          2,
          {
            x: "0",
            opacity: 1,
            ease: Power4.easeInOut
          },
          0.3 * (i % 3)
        );
      };
      blogContainer.current.childNodes.forEach(animate);
    }
  }, [articals]);
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        ref={blogContainer}
        className={clsx(appStyle.burgerSpace, classes.asideSpacing)}
      >
        {articals.map((item, i) => {
          return (
            <Grid
              key={i.toString()}
              className={classes.initialMovement}
              item
              xs={12}
              sm={6}
              md={4}
              xl={3}
            >
              <BlogCard />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        className={gStyles["margin-top-5"]}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Button onClick={loadMore} color="primary">
            Load older articals ...
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;

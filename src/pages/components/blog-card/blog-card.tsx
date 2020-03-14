import React from "react";
import clsx from "clsx";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton
} from "react-share";
import {
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  CardActionArea,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { ArrowRightAlt, Facebook, Twitter, LinkedIn } from "@material-ui/icons";
import { useStyles } from "./style.blog-card";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useAppStyle } from "../../../styles/app.style";
import { useTranslation } from "react-i18next";
import FALLBACK_IMAGE from "../../../static/no-image.png";
import Eggs from "../../../static/eggs.jpg";

const BlogCard: React.FC<any> = () => {
  const appStyles = useAppStyle();
  const gStyles = useGlobalStyle();
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMediaFallback = event => (event.target.src = FALLBACK_IMAGE);
  return (
    <Card className={clsx(classes.root, classes.cardMargin)}>
      <CardActionArea>
        <div className={classes.mediaContaner}>
          <img
            className={classes.media}
            src={Eggs}
            onError={onMediaFallback}
            title="Contemplative Reptile"
            alt={`Artical`}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography
            className={clsx(appStyles.grayColor, gStyles["margin-bottom-2"])}
            variant="caption"
            display="block"
            gutterBottom
          >
            <small>BY ADMIN / WEB DESIGN / 14</small>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${`Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica`.substr(
              0,
              135
            )} ...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          aria-controls="share-menu"
          onClick={handleClick}
          size="small"
          color="secondary"
        >
          {t("blogCard.share")}
        </Button>
        <Menu
          id="share-menu"
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={handleClose}
          // anchorOrigin={{
          //   vertical: "top",
          //   horizontal: "right"
          // }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
        >
          <LinkedinShareButton url="https://kakiee.at" className={gStyles.w100}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LinkedIn fontSize="small" color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Linkedin" />
            </MenuItem>
          </LinkedinShareButton>

          <FacebookShareButton url="https://kakiee.at" className={gStyles.w100}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Facebook fontSize="small" color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </MenuItem>
          </FacebookShareButton>
          <TwitterShareButton url="https://kakiee.at" className={gStyles.w100}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Twitter fontSize="small" color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Twitter" />
            </MenuItem>
          </TwitterShareButton>
        </Menu>
        <Button size="small" color="secondary">
          {t("blogCard.readMore")}&nbsp;
          <ArrowRightAlt fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;

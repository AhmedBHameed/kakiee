import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, LinearProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { END_POINT } from "config";
import { useFileUploader, IFileRespond } from "@lib";
import { useStyle } from "./style.image-uploader";

const ImageUploader: React.FC<{
  src: string;
  onImageChange: (value: string, fRes?: IFileRespond) => void;
}> = ({ src, onImageChange }) => {
  const dispatch = useDispatch();

  const classes = useStyle();

  const { handleFileChange, isUploading } = useFileUploader({
    dispatch,
    jwtName: "kakieeToken",
    uploadApi: END_POINT.API_UPLOADS,
    onFinish: (imgs, fRes) => {
      const domainLink =
        process.env["NODE_ENV"] === "development"
          ? `${process.env["REACT_APP_DOMAIN_DEV"]}`
          : `${process.env["REACT_APP_DOMAIN_PROD"]}`;
      onImageChange(!!imgs[0] ? `${domainLink}/${imgs[0]}` : "", fRes);
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.innerContent}>
        <img
          className={classes.image}
          src={
            !!src
              ? src
              : "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"
          }
        />
        <IconButton className={classes.icon} aria-label="Menu">
          <input
            className={classes.fileInput}
            type="file"
            onChange={handleFileChange}
          />
          <Add fontSize="large" />
        </IconButton>
        {isUploading && (
          <LinearProgress className={classes.progress} color="secondary" />
        )}
      </div>
    </div>
  );
};
export default ImageUploader;

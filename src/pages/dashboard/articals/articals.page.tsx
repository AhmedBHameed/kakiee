import React, { useState, useRef } from "react";
import clsx from "clsx";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Grid,
  FormControl,
  TextField,
  CircularProgress,
  Button,
  FormHelperText
} from "@material-ui/core";
import { useFormReducer } from "@lib/services";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

// import clsx from "clsx";
// import { useDispatch, useSelector } from "react-redux";
// import Content from "../../components/content/content";
// // import classes from "*.module.css";
// import { useStyle } from "./style.main";
// import { IInitAppState } from "../../../@lib/store/kakiee/rootReducer";
// import { AppBarComponent, AppDrawer } from "../../../@lib/components";
// // import { SettingsApplications, SupervisorAccount } from "@material-ui/icons";
// import { ROUTER } from "../../../config";
// import { resetAppState } from "../../../@lib/store/kakiee/actions";
// import { removeToken, getToken } from "../../../@lib/util";
// import { Dashboard } from "@material-ui/icons";
// import NavbarAside from "../../components/navbar-aside/navbar-aside";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyle } from "./style.articals";
import { useEffect } from "react";
import "./artical.scss";
// import { IUserProfileState } from "../../../@lib/store/kakiee/reducers";

const Articals: React.FC<RouteComponentProps<any>> = props => {
  const { t } = useTranslation();
  const gStyles = useGlobalStyle();
  const classes = useStyle();
  const editorEl = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState<any>();
  const [form] = useState({
    state: {
      name: "",
      subject: "",
      email: "",
      message: ""
    },
    validators: {
      name: {
        required: true,
        requiredLocales: t("validators.required")
      },
      email: {
        required: true,
        requiredLocales: t("validators.required"),
        validators: [
          {
            validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            error: t("validators.invalidEmail")
          }
        ]
      },
      subject: {
        required: true,
        requiredLocales: t("validators.required")
      },
      message: {
        required: true,
        requiredLocales: t("validators.required")
      }
    }
  });

  const { state, handleOnChange, handleOnSubmit } = useFormReducer(
    form.state,
    form.validators,
    (isValid, data) => {
      editor.save().then(res => {
        console.log("CHECK=>>: res", res);
      });
      console.log(isValid, data);
    }
  );

  useEffect(() => {
    setEditor(() => {
      if (!!editorEl?.current) {
        return new EditorJS({
          holderId: editorEl.current,
          tools: {
            header: Header,
            list: List,
            paragraph: Paragraph
          }
        });
      }
    });
  }, [setEditor]);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Typography variant="h3" display="block" gutterBottom>
        New artical
      </Typography>
      <form
        onSubmit={handleOnSubmit}
        className={clsx(gStyles.w100, classes.shiftLeft)}
      >
        <Grid item xs={12}>
          <FormControl className={gStyles.w100}>
            <TextField
              className={gStyles.noSpacing}
              autoFocus
              error={state.submitted && state.controllers.subject.inValid}
              id="subject"
              name="subject"
              type="subject"
              value={state.formData.subject}
              onChange={handleOnChange}
              variant="outlined"
              label="Subject"
              margin="none"
            />
            {/* <FormHelperText
              id="name"
              component={"div"}
              margin="dense"
              className={clsx([
                state.controllers.name.inValid ? classes.errorColor : ""
              ])}
            >
              <ul className={gStyles["padding-right-2"]}>
                {state.submitted &&
                  state.controllers.name.errors.map((error, i) => (
                    <li key={`name-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText> */}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={gStyles.w100}>
            <div ref={editorEl} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={gStyles.w100}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={gStyles.w100}
            >
              <span>Send</span>
              {loading && (
                <CircularProgress
                  className={classes.circulProgressColor}
                  size={30}
                  thickness={5}
                />
              )}
            </Button>

            <FormHelperText
              id="email"
              component={"div"}
              margin="dense"
              className={classes.errorColor}
            >
              <ul className={gStyles["padding-right-2"]}>
                {state.submitted &&
                [
                  ...state.controllers.email.errors,
                  ...state.controllers.name.errors,
                  ...state.controllers.message.errors,
                  ...state.controllers.subject.errors
                ].some(
                  error => error.indexOf(t("validators.required")) > -1
                ) ? (
                  <li>
                    <small>{t("validators.allRequired")}</small>
                  </li>
                ) : (
                  ""
                )}

                {state.submitted &&
                  [
                    ...state.controllers.email.errors,
                    ...state.controllers.name.errors,
                    ...state.controllers.message.errors,
                    ...state.controllers.subject.errors
                  ].map((error, i) => {
                    if (error.indexOf(t("validators.required")) > -1) return "";
                    return (
                      <li key={`email-error-${i.toString()}`}>
                        <small>{error}</small>
                      </li>
                    );
                  })}
              </ul>
            </FormHelperText>
          </FormControl>
        </Grid>
      </form>
    </Grid>
  );
};

export default Articals;

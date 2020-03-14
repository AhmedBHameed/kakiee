import React, { useCallback, useState } from "react";
import clsx from "clsx";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  ButtonGroup,
  LinearProgress,
  FormControl,
  InputLabel,
  FormHelperText,
  Input
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import {
  httpClient,
  IAxiosErrorResponse,
  catchError,
  useFormReducer
} from "../../../../@lib/services";
import { IFormValidation } from "../../../../@lib/services/form-builder/models/form-builder-validation.model";
import { IForgetPassGQL, forgetPassGQL } from "../../../../queries";
import { ROUTER, END_POINT } from "../../../../config";
import { notify } from "../../../../@lib/store/nodeys-dashboard/actions";
import { useStyles } from "./style.forget-pass";
import { useDispatch } from "react-redux";
import { useGlobalStyle } from "../../../../@lib/styles/lib.style";

const formModel = {
  email: ""
};

const validationSch: IFormValidation = {
  email: {
    validators: [
      {
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        error: "Invalid email address!"
      }
    ]
  }
};

const ForgetPassword: React.FC<RouteComponentProps<any>> = ({
  history,
  match
}) => {
  const classes = useStyles();
  const gStyles = useGlobalStyle();

  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { state, handleOnChange, handleOnSubmit } = useFormReducer(
    formModel,
    validationSch,
    (isValid, data) => {
      setSubmitted(true);
      if (isValid) {
        forgetPass(isValid, data);
      }
    }
  );

  const forgetPass = useCallback(
    (isValid: boolean, data: any) => {
      if (isValid) {
        setSubmitted(true);
        setLoading(true);
        httpClient
          .post(END_POINT.API_USER_AUTH, forgetPassGQL(data))
          .then((res: IForgetPassGQL) => {
            setLoading(false);
            if (!!res.data) {
              if (!!res.data.forgetPass) {
                dispatch(
                  notify({
                    open: true,
                    message: `Change password link will be sent to ${data.email}`,
                    type: "success"
                  })
                );
                history.replace(`${ROUTER.LOGIN.path}`);
                return;
              }
              dispatch(
                notify({
                  open: true,
                  message: "Something went wrong! Please try again.",
                  type: "error"
                })
              );
            } else {
              throw new Error("Something went wrong!");
            }
          })
          .catch((e: IAxiosErrorResponse) => {
            setLoading(false);
            catchError("Something went wrong!", dispatch);
          });
      }
    },
    [dispatch, history]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Forget your password ?
        </Typography>
        <Typography variant="subtitle1">
          Please type your email to send you
          <br />
          change password link.
        </Typography>
        <FormControl className={clsx([gStyles.w100])}>
          <InputLabel
            htmlFor="email"
            className={clsx([
              submitted && state.controllers.email.inValid
                ? classes.errorColor
                : "",
              classes.label
            ])}
          >
            Email address
          </InputLabel>
          <Input
            error={submitted && state.controllers.email.inValid}
            id="email"
            name="email"
            type="email"
            value={state.formData.email}
            autoComplete="email"
            onChange={handleOnChange}
          />
          <FormHelperText
            id="email"
            component={"div"}
            margin="dense"
            className={classes.errorColor}
          >
            <ul>
              {submitted &&
                state.controllers.email.errors.map((error, i) => (
                  <li key={`email-error-${i.toString()}`}>
                    <small>{error}</small>
                  </li>
                ))}
            </ul>
          </FormHelperText>
        </FormControl>
      </CardContent>
      <CardActions>
        <Grid item xs={12}>
          <ButtonGroup fullWidth>
            <Button
              disabled={isLoading}
              className={gStyles["margin-1"]}
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Send
            </Button>
          </ButtonGroup>
        </Grid>
      </CardActions>
      {isLoading && <LinearProgress color="secondary" />}
    </form>
  );
};

export default ForgetPassword;

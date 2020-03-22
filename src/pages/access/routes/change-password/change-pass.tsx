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
  Input,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import {
  httpClient,
  IAxiosErrorResponse,
  catchError
} from "../../../../@lib/services";
import { IFormValidation, useFormReducer } from "../../../../@lib";
import { IChangePassGQL, changePassGQL } from "../../../../queries";
import { ROUTER, END_POINT } from "../../../../config";
import { notify } from "../../../../@lib/store/nodeys-dashboard/actions";
import { useStyles } from "./style.change-pass";
import { useDispatch } from "react-redux";
import { useGlobalStyle } from "../../../../@lib/styles/lib.style";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const formModel = {
  password: "",
  confirmPass: ""
};

const validationSch: IFormValidation = {
  password: {
    validators: [
      {
        validate: state => {
          const length = state.password.length;
          return length > 6 && length < 32;
        },
        error: "Password should between 6-31 characters!"
      },
      {
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/,
        error: "Password should contain characters, numbers, samples."
      }
    ]
  },
  confirmPass: {
    validators: [
      {
        validate: (state: any) => state.confirmPass === state.password,
        error: "Passwords do not match!"
      }
    ]
  }
};

const ChangePass: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const classes = useStyles();
  const gStyles = useGlobalStyle();

  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { state, handleOnChange, handleOnSubmit } = useFormReducer(
    formModel,
    validationSch,
    (isValid, data) => {
      setSubmitted(true);
      if (isValid) {
        loginOrRegister(isValid, data);
      }
    }
  );

  const handleClickShowPassword = useCallback(
    e => {
      e.preventDefault();
      setShowPass(b => !b);
    },
    [setShowPass]
  );

  const loginOrRegister = useCallback(
    (isValid: boolean, data: any) => {
      if (isValid) {
        setSubmitted(true);
        setLoading(true);
        httpClient
          .post(
            END_POINT.API_USER_AUTH,
            changePassGQL({
              verificationId: match.params["verificationId"],
              password: data.password
            })
          )
          .then((res: IChangePassGQL) => {
            setLoading(false);
            if (!!res.data) {
              if (!!res.data.changePass) {
                dispatch(
                  notify({
                    open: true,
                    message: `Password has been changed successfully`,
                    type: "success"
                  })
                );
                history.push(
                  `${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`
                );
                return;
              }
              dispatch(
                notify({
                  open: true,
                  message:
                    "It seems that some monkey skills was not qualified enough to hide all error!!",
                  type: "error"
                })
              );
            } else {
              throw new Error("Something went wrong!");
            }
          })
          .catch((e: IAxiosErrorResponse) => {
            setLoading(false);
            catchError(
              "Something went wrong! Please contact support team",
              dispatch
            );
          });
      }
    },
    [history, dispatch, match.params]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Change password
        </Typography>
        <Grid item xs={12}>
          <FormControl className={clsx([gStyles.w100])}>
            <InputLabel
              htmlFor="password"
              className={clsx([
                submitted && state.controllers.password.inValid
                  ? classes.errorColor
                  : "",
                classes.label
              ])}
            >
              New password
            </InputLabel>
            <Input
              error={submitted && state.controllers.password.inValid}
              id="password"
              name="password"
              value={state.formData.password}
              onChange={handleOnChange}
              type={showPass ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              id="password"
              component={"div"}
              margin="dense"
              className={
                state.controllers.password.inValid ? classes.errorColor : ""
              }
            >
              <ul className={gStyles["padding-right-2"]}>
                {submitted &&
                  state.controllers.password.errors.map((error, i) => (
                    <li key={`password-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx([gStyles.w100])}>
            <InputLabel
              htmlFor="confirmPass"
              className={clsx([
                submitted && state.controllers.confirmPass.inValid
                  ? classes.errorColor
                  : "",
                classes.label
              ])}
            >
              Confirm password
            </InputLabel>
            <Input
              error={submitted && state.controllers.confirmPass.inValid}
              id="confirmPass"
              name="confirmPass"
              type={showPass ? "text" : "password"}
              value={state.formData.confirmPass}
              onChange={handleOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPass ? (
                      <Visibility color="secondary" />
                    ) : (
                      <VisibilityOff color="secondary" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              id="confirmPass"
              component={"div"}
              margin="dense"
              className={
                state.controllers.confirmPass.inValid ? classes.errorColor : ""
              }
            >
              <ul className={gStyles["padding-right-2"]}>
                {submitted &&
                  state.controllers.confirmPass.errors.map((error, i) => (
                    <li key={`confirmPass-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText>
          </FormControl>
        </Grid>
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

export default ChangePass;

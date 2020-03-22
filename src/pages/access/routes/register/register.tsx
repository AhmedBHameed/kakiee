import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { get } from "lodash";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  ButtonGroup,
  LinearProgress,
  FormControl,
  FormHelperText,
  InputLabel,
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
import { registerUserGQL, IRegisterUserGQL } from "../../../../queries";
import { END_POINT } from "../../../../config";
import { notify } from "../../../../@lib/store/nodeys-dashboard/actions";
import { useStyles } from "./style.register";
import { useDispatch } from "react-redux";
import { useGlobalStyle } from "../../../../@lib/styles/lib.style";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IFormValidation, useFormReducer } from "../../../../@lib";

const formModel = {
  email: "",
  password: "",
  confirmPass: ""
};

const validationSch: IFormValidation = {
  email: {
    validators: [
      {
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        error: "Invalid email address!"
      }
    ]
  },
  password: {
    validators: [
      {
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        error: "Password should contain characters, numbers, samples."
      }
    ]
  },
  confirmPass: {
    validators: [
      {
        validate: (v: any) => {
          return v.password === v.confirmPass;
        },
        error: "Password dose not matches!"
      }
    ]
  }
};

const Register: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const classes = useStyles();
  const gStyles = useGlobalStyle();

  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = useCallback(
    e => {
      e.preventDefault();
      setShowPass(b => !b);
    },
    [setShowPass]
  );

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

  const loginOrRegister = useCallback(
    (isValid: boolean, state: any) => {
      setSubmitted(true);
      if (isValid) {
        setLoading(true);
        httpClient
          .post(
            END_POINT.API_USER_AUTH,
            registerUserGQL({
              email: state.email,
              password: state.password
            })
          )
          .then((res: IRegisterUserGQL) => {
            setLoading(false);
            if (!!res.data) {
              if (!!res.data.registerUser) {
                const { email } = res.data.registerUser;
                dispatch(
                  notify({
                    open: true,
                    message: `Activation link has been sent to ${email}.`,
                    type: "success"
                  })
                );
                return;
              }
              dispatch(
                notify({
                  open: true,
                  message: "Please make sure to verify your email.",
                  type: "error"
                })
              );
            } else {
              throw new Error("Something went wrong!");
            }
          })
          .catch((e: IAxiosErrorResponse) => {
            setLoading(false);
            console.log(e);
            if (
              get(e, "serverRespond.errors[0].message", "").indexOf("E11000") >
              -1
            ) {
              catchError(
                `This email address is already registered! Try to verify it first or change the password as a final step.`,
                dispatch
              );
              return;
            }
            catchError(e, dispatch);
          });
      }
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Sing up
        </Typography>

        <Grid item xs={12}>
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
              onChange={handleOnChange}
            />
            <FormHelperText
              id="email"
              component={"div"}
              margin="dense"
              className={
                state.controllers.email.inValid ? classes.errorColor : ""
              }
            >
              <ul className={gStyles["padding-right-2"]}>
                {submitted &&
                  state.controllers.email.errors.map((error, i) => (
                    <li key={`email-error-${i.toString()}`}>
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
              htmlFor="password"
              className={clsx([
                submitted && state.controllers.password.inValid
                  ? classes.errorColor
                  : "",
                classes.label
              ])}
            >
              Password
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
              value={state.formData.confirmPass}
              onChange={handleOnChange}
              type={showPass ? "text" : "password"}
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
              Sing up
            </Button>
          </ButtonGroup>
        </Grid>
      </CardActions>
      {isLoading && <LinearProgress color="secondary" />}
    </form>
  );
};

export default Register;

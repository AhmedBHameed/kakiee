import React, { useCallback, useState } from "react";
import { get } from "lodash";
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
import { RouteComponentProps, Link } from "react-router-dom";
import {
  httpClient,
  IAxiosErrorResponse,
  catchError,
  useFormReducer
} from "../../../../@lib/services";
import { setToken } from "../../../../@lib/util";
import { IFormValidation } from "../../../../@lib/services/form-builder/models/form-builder-validation.model";
import { IGetTokenGQL, getTokenGQL } from "../../../../queries";
import { ROUTER, END_POINT } from "../../../../config";
import { notify } from "../../../../@lib/store/nodeys-dashboard/actions";
import { useStyles } from "./style.login";
import { useDispatch } from "react-redux";
import { useGlobalStyle } from "../../../../@lib/styles/lib.style";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const formModel = {
  email: "",
  password: ""
};

const validationSch: IFormValidation = {
  email: {
    required: true,
    validators: [
      {
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        error: "Invalid email address!"
      }
    ]
  },
  password: {
    required: true,
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
  }
};

const Login: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
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
    (isValid: boolean, data: any) => {
      if (isValid) {
        setSubmitted(true);
        setLoading(true);
        httpClient
          .post(
            END_POINT.API_USER_AUTH,
            getTokenGQL({
              email: data.email,
              password: data.password
            })
          )
          .then((res: IGetTokenGQL) => {
            setLoading(false);
            if (!!res.data) {
              if (!!res.data.getToken.isAuthenticated) {
                setToken(res.data.getToken.token, "kakieeToken");
                dispatch(
                  notify({
                    open: true,
                    message: `Welcome`,
                    type: "success"
                  })
                );
                history.push(`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`);
                return;
              }
              // if( get(res, "data.errors[0].extensions.code", "") ===  "ER_004_AUTH") {
              // }
              dispatch(
                notify({
                  open: true,
                  message: get(
                    res,
                    "errors[0].message",
                    "Can't handle server respond"
                  ),
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
              get(
                e,
                "serverRespond.errors[0].message",
                "Can't handle server respond"
              ),
              dispatch
            );
          });
      }
    },
    [history, dispatch]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Login
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
              Email
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
        <Typography variant="subtitle1">
          <small>
            Forget your password ? click&nbsp;
            <Link to={`${ROUTER.FORGET_PASS.path}`}>her</Link>.
          </small>
        </Typography>
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
              Login
            </Button>
          </ButtonGroup>
        </Grid>
      </CardActions>
      {isLoading && <LinearProgress color="secondary" />}
    </form>
  );
};

export default Login;

import React, { useCallback, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import clsx from "clsx";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ROUTER } from "../../../../config";
import { useStyles } from "./style.login";
import { useGlobalStyle } from "../../../../@lib/styles/lib.style";
import { useLoginOrRegisterApi } from "../api/useLoginOrRegister.hook";
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

const Login: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const classes = useStyles();
  const gStyles = useGlobalStyle();
  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = useCallback(
    e => {
      e.preventDefault();
      setShowPass(b => !b);
    },
    [setShowPass]
  );

  const {
    state,
    handleOnChange,
    handleOnSubmit,
    isLoading
  } = useLoginOrRegisterApi({ history });

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
                state.submitted && state.controllers.email.inValid
                  ? classes.errorColor
                  : "",
                classes.label
              ])}
            >
              Email
            </InputLabel>
            <Input
              error={state.submitted && state.controllers.email.inValid}
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
                {state.submitted &&
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
                state.submitted && state.controllers.password.inValid
                  ? classes.errorColor
                  : "",
                classes.label
              ])}
            >
              Password
            </InputLabel>
            <Input
              error={state.submitted && state.controllers.password.inValid}
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
                {state.submitted &&
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

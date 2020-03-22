import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { Card, Grid, Paper, Tabs, Tab } from "@material-ui/core";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useStyles } from "./style.access";
import { ROUTER } from "../../config";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Activation from "./routes/activation/activation";
import ForgetPassword from "./routes/forget-pass/forget-pass";
import ChangePass from "./routes/change-password/change-pass";

const AccessPage: React.FC<RouteComponentProps<any>> = ({
  history,
  match,
  location
}) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState<number>(
    match.url === `${match.url}/${ROUTER.REGISTER.path}` ? 1 : 0
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    history.replace(
      !!newValue
        ? [match.url, ROUTER.REGISTER.path].join("/")
        : [match.url, ROUTER.LOGIN.path].join("/")
    );
  };

  useEffect(() => {
    setTabValue(() =>
      location.pathname === `${match.url}/${ROUTER.REGISTER.path}` ? 1 : 0
    );
  }, [match.url, location.pathname]);

  const memoRoutes = useMemo(
    () => (
      <>
        <Route
          path={`${match.url}/${ROUTER.LOGIN.path}`}
          exact
          component={props => <Login {...props} />}
        />
        <Route
          path={`${match.url}/${ROUTER.REGISTER.path}`}
          exact
          component={props => <Register {...props} />}
        />
        <Route
          path={`${match.url}/${ROUTER.FORGET_PASS.path}`}
          exact
          component={props => <ForgetPassword {...props} />}
        />
        <Route
          path={`${match.url}/${ROUTER.CHANGE_PASS.path}/:verificationId`}
          exact
          component={props => <ChangePass {...props} />}
        />
        <Route
          path={`${match.url}/${ROUTER.ACTIVATE.path}/:verificationId`}
          exact
          component={props => <Activation {...props} />}
        />
      </>
    ),
    [match.url]
  );

  return (
    <div className={clsx(classes.backgroundColor, classes.fullScreen)}>
      <Grid
        container
        className={classes.fullScreen}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Card className="card">
            <Paper square>
              {/* {memoTabs} */}
              <Paper square>
                <Tabs
                  value={tabValue}
                  indicatorColor="secondary"
                  textColor="secondary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Login" key="login" />,
                  <Tab label="Register" key="register" />
                </Tabs>
              </Paper>
              {match.url === `${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}` &&
                match.isExact && (
                  <Redirect to={`${match.url}/${ROUTER.LOGIN.path}`} />
                )}
              {memoRoutes}
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccessPage;

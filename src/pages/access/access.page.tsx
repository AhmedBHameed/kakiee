import React, { useState, useEffect } from "react";
import { Card, Grid, Container, Paper, Tabs, Tab } from "@material-ui/core";
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

  return (
    <Container>
      <Grid
        container
        className={classes.fullHight}
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
                  indicatorColor="primary"
                  textColor="primary"
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
              <Route
                path={`${match.path}/${ROUTER.LOGIN.path}`}
                exact
                component={props => <Login {...props} />}
              />
              <Route
                path={`${match.path}/${ROUTER.REGISTER.path}`}
                exact
                component={props => <Register {...props} />}
              />
              <Route
                path={`${match.path}/${ROUTER.FORGET_PASS.path}`}
                exact
                component={props => <ForgetPassword {...props} />}
              />
              <Route
                path={`${match.path}/${ROUTER.CHANGE_PASS.path}/:verificationId`}
                exact
                component={props => <ChangePass {...props} />}
              />
              <Route
                path={`${match.path}/${ROUTER.ACTIVATE.path}/:verificationId`}
                exact
                component={props => <Activation {...props} />}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccessPage;

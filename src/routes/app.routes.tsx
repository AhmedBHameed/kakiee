import React, { createContext, useMemo, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { IInitAppState } from "../@lib/store/nodeys-dashboard/rootReducer";
import Notification from "../@lib/components/notification/notification";
import { ROUTER } from "../config";
import { useGlobalStyle } from "../styles/global.style";
import Login from "../@lib/RouterComponents/login/login";
import Public from "../@lib/RouterComponents/public/public";
import Protected from "../@lib/RouterComponents/protected/protected";
import { IContext } from "../@lib/interfaces";

const Context = createContext<IContext>({
  isAuthenticated: false
  // authenticate(cb) {
  //   this.isAuthenticated = true
  //   setTimeout(cb, 100) // fake async
  // },
  // signout(cb) {
  //   this.isAuthenticated = false
  //   setTimeout(cb, 100) // fake async
  // }
});

const Wrapper: React.FC<any> = () => {
  const gStyles = useGlobalStyle();
  const notify = useSelector((state: IInitAppState) => state.notificationMsg);

  const [context, updateContext] = React.useState({ isAuthenticated: false });
  console.log("CHECK=>>: context", context);

  useEffect(() => {
    updateContext(() => ({ isAuthenticated: true }));
  }, [updateContext]);

  const switchMemo = useMemo(
    () => (
      <Context.Provider value={context}>
        <Context.Consumer>
          {cntx => (
            <Switch>
              <Protected
                path={`${ROUTER.ROOT.path}${ROUTER.MY_DASHBOARD.path}`}
                {...cntx}
                Component={Login}
              />
              <Route
                path={`${ROUTER.ROOT.path}${ROUTER.LOGIN.path}`}
                render={props => <Login {...props} />}
              />
              <Route
                path={ROUTER.ROOT.path}
                exact
                render={props => <Public {...props} />}
              />
            </Switch>
          )}
        </Context.Consumer>
      </Context.Provider>
    ),
    []
  );

  return (
    <>
      <div className={gStyles.fullHight}>{switchMemo}</div>
      <Notification
        variant={notify.type === "success" ? "success" : "error"}
        open={!!notify.open}
        message={notify.message || ""}
      />
    </>
  );
};
export default Wrapper;

import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { IInitAppState } from "../@lib/store/nodeys-dashboard/rootReducer";
import { Notification } from "../@lib/components/notification/notification";
import { ROUTER } from "../config";
import AccessPage from "../pages/access/access.page";
import Kakiee from "../pages/kakiee/kakiee.page";
import { useGlobalStyle } from "../@lib/styles/lib.style";
import Protected from "../pages/protected/protected";

const Wrapper: React.FC<any> = () => {
  const gStyles = useGlobalStyle();
  const notify = useSelector((state: IInitAppState) => state.notificationMsg);

  return (
    <>
      <div className={gStyles.h100}>
        <Switch>
          <Route
            path={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
            render={props => (
              <Protected
                importedComponent={import("../pages/dashboard/dashboard.page")}
                onFailRedirectTo={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
                {...props}
              />
            )}
          />
          <Route
            path={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}`}
            exact
            component={AccessPage}
          />
          <Route path={`${ROUTER.ROOT.path}`} exact component={Kakiee} />
        </Switch>
      </div>
      <Notification
        variant={notify.type === "success" ? "success" : "error"}
        open={!!notify.open}
        message={notify.message || ""}
        direction={{
          vertical: "bottom",
          horizontal: "right"
        }}
      />
    </>
  );
};
export default Wrapper;

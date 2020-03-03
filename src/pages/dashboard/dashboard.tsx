import React from "react";
import Protected from "../protected/protected";
import { ROUTER } from "config";

const Dashboard: React.FC<any> = props => {
  return (
    <Protected
      component={import("./main/main.page")}
      path={`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`}
      onFailRedirectTo={`${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`}
    />
  );
};

export default Dashboard;

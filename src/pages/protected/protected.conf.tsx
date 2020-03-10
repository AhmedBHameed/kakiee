import React, { lazy, Suspense } from "react";
import { RouteComponentProps } from "react-router-dom";
import LoadingPage from "../loading-page/loading-page";
import { IProtectedOpt } from "../../@lib/store/kakiee/reducers";

const LoadPage = (importedPage: any, protectionOpt: IProtectedOpt) => {
  return lazy(() =>
    Promise.all([
      new Promise((res, rej) => {
        if (protectionOpt.isAdmin) {
          res(importedPage);
        } else if (protectionOpt.isRequestFetched && !!protectionOpt.history) {
          protectionOpt.history.push(`${protectionOpt.onFailRedirectTo}`);
        }
      })
    ]).then(([moduleExports]: any) => moduleExports)
  );
};

const WaitingComponent = (
  Component: Promise<any>,
  props: RouteComponentProps,
  protectionOpt: IProtectedOpt
) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      {React.createElement(LoadPage(Component, protectionOpt), props)}
    </Suspense>
  );
};

export const RenderComponent = (
  component: Promise<any>,
  props: RouteComponentProps,
  protectionOpt: IProtectedOpt
) => {
  protectionOpt.history = !!props.history && props.history;
  return WaitingComponent(
    component,
    {
      ...props
    },
    protectionOpt
  );
};

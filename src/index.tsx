import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { RouteComponentProps } from "react-router-dom";
import LoadingPage from "./pages/loading-page/loading-page";

const LoadPage = (importedPage: any) => {
  return lazy(() => {
    return Promise.all([
      importedPage,
      new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(([moduleExports]) => moduleExports);
  });
};

function WaitingComponent(Component: React.FC<any>) {
  const ComponentWithToast = (props: RouteComponentProps<any>) => {
    return (
      <Suspense fallback={<LoadingPage />}>
        <Component {...props} />
      </Suspense>
    );
  };
  return ComponentWithToast;
}

ReactDOM.render(
  React.createElement(WaitingComponent(LoadPage(import("./App")))),
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

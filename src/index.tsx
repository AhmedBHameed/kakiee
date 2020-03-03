import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import LoadingPage from "./pages/loading-page/loading-page";
import "./@lib/services/i18n/i18n";

ReactDOM.render(
  <Suspense fallback={<LoadingPage />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

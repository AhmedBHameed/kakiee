import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "@lib/store/kakiee/configureStore";
import Wrapper from "./routes/app.routes";
import "App.scss";

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <Router history={history}>
      <Wrapper />
    </Router>
  </Provider>
);
export default App;

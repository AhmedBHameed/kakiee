import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MimTheme } from "./styles/app.style";
import { Provider } from "react-redux";
import configureStore, { history } from "@lib/store/kakiee/configureStore";
import Wrapper from "./routes/app.routes";
import "App.scss";

const store = configureStore();

const App: React.FC = () => (
  <MuiThemeProvider theme={MimTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Wrapper />
      </Router>
    </Provider>
  </MuiThemeProvider>
);
export default App;

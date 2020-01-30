import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MimTheme } from "@lib/styles/lib.style";
import { Provider } from "react-redux";
import configureStore, { history } from "@lib/store/kakiee/configureStore";
import "App.scss";
import Wrapper from "./routes/app.routes";

const store = configureStore();

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={MimTheme}>
      <Provider store={store}>
        <Router history={history}>
          <Wrapper />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;

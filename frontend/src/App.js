import React from "react";
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import {createMuiTheme, CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

import Welcome from "./components/welcome/Welcome";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#a83236"
        },
        secondary: {
            main: "#707070"
        }
    }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <HashRouter>
              <Switch>
                  <Route path={"/"}>
                      <Welcome/>
                  </Route>
              </Switch>
          </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

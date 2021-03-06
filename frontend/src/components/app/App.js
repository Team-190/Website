import React from "react";
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import {createMuiTheme, CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

import Welcome from "../welcome/Welcome";
import StudentView from "../student/StudentView";
import ChooseRole from "../welcome/ChooseRole";
import Requirements from "../student/Requirements";
import UberView from "../ubermentor/UberView";
import LoggedOut from "../welcome/LoggedOut";

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
                        <Route path={"/uber"}>
                            <UberView/>
                        </Route>
                        <Route path={"/student"}>
                            <StudentView/>
                        </Route>
                        <Route path={"/choose"}>
                            <ChooseRole/>
                        </Route>
                        <Route path={"/requirements"}>
                            <Requirements/>
                        </Route>
                        <Route path={"/loggedOut"}>
                            <LoggedOut/>
                        </Route>
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

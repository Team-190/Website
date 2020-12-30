import React, {Component} from "react";
import Background from "../background/Background";
import {Button, Grid} from "@material-ui/core";

class StudentView extends Component {
    generateToolbarContent() {
        return (
            <Grid container spacing={4}>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Slack </Button>
                </Grid>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Records </Button>
                </Grid>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Events </Button>
                </Grid>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Voting </Button>
                </Grid>
            </Grid>
        );
    }

    generateContent() {

    }

    render() {
        return (
          <Background toolbarContent={this.generateToolbarContent()} content={this.generateContent()}/>
        );
    }
}

export default StudentView;
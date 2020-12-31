import React from "react";
import Background from "../background/Background";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

class StudentBackground extends React.Component {
    generateToolbarContent() {
        return (
            <Grid container spacing={4}>
                <Grid item>
                    <Link to={"/student"}>
                        <Button variant={"contained"}> Home </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Slack </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Requests </Button>
                </Grid>
                <Grid item>
                    <Link to={"/requirements"}>
                        <Button variant={"contained"}> Travel Team Requirements </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Voting </Button>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <Background toolbarContent={this.generateToolbarContent()} content={this.props.content}/>
        )
    }
}

export default StudentBackground;
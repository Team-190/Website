import React from "react";
import Background from "../utility/Background";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

class UberBackground extends React.Component {
    generateToolbarContent() {
        const  {logout} = this.props.auth0;
        return (
            <Grid container spacing={4}>
                <Grid item>
                    <Link to={"/uber"}>
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
                    <Button variant={"contained"}> Users </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Manage Site </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => logout({ returnTo: window.location.origin }) }> Logout </Button>
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

export default UberBackground;
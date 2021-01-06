import React from "react";
import Background from "../utility/Background";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import {withAuth0} from "@auth0/auth0-react";

class StudentBackground extends React.Component {
    generateToolbarContent() {
        const  {logout} = this.props.auth0;
        return (
            <Grid container spacing={4}>
                <Grid item>
                    <Link to={"/"}>
                        <Button variant={"contained"}> Home </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Slack </Button>
                </Grid>
                <Grid item>
                    <Link to={"/requests"}>
                        <Button variant={"contained"}> Requests </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"/requirements"}>
                        <Button variant={"contained"}> Travel Team Requirements </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Voting </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={() => logout({ returnTo: window.location.origin }) }> Logout </Button>
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

export default withAuth0(StudentBackground);
import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import Background from "../utility/Background";
import team from "../../resources/images/2k20.png";
import LambdaAPI from "../utility/LambdaAPI";
import {withAuth0} from "@auth0/auth0-react";

const styles = {
    mainImage: {
        width: "75%",
        paddingTop: "10%"
    }
}

class Welcome extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isAuthenticated} = this.props.auth0;
        if (isAuthenticated) {
            this.handleLogin();
        } else {
            console.log("No authentication.");
        }
    }

    handleLogin() {
        LambdaAPI.RETURN_ROLE(this.props.auth0, (role) => {
            if (role === "undefined") {
                window.location.href = "#/choose";
            } else if (role === "ubermentor") {
                window.location.href = "#/uber";
            } else if (role === "student") {
                window.location.href = "#/student";
            }
        });
    }


    generateToolbarContent() {
        const {loginWithRedirect} = this.props.auth0;
        return (
            <Button variant={"contained"} onClick={() => loginWithRedirect()}> Log in</Button>
        );
    }

    generateContent() {
        const {loginWithRedirect} = this.props.auth0;
        return (
            <Grid container alignItems={"center"} justify={"center"}>
                <Grid item xs={12}>
                    <Typography variant={"h2"} id={"test"}> Welcome to FRC Team 190's website! </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Please log in with your Slack account to view your records,
                                register for
                                events, and vote. </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button size={"large"} variant={"contained"} color={"primary"}
                                    onClick={() => loginWithRedirect()}> Log in</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img style={styles.mainImage} src={team} alt={"2020 team"}/>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <Background toolbarContent={this.generateToolbarContent()} content={this.generateContent()}/>
        );
    }
}


export default withAuth0(Welcome);
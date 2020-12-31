import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import Background from "../background/Background";
import team from "../../resources/images/2k20.png";
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
            console.log("No authentication.")
        }
    }


    handleLogin() {
        console.log("handleLogin");
        const {getAccessTokenWithPopup} = this.props.auth0;
        getAccessTokenWithPopup({audience: "team190", scopes: "openid profile email"}).then((token) => {
            const api_url = "https://c22onf2w15.execute-api.us-east-1.amazonaws.com/production/login";
            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            xmlhttp.open("GET", api_url, true);
            xmlhttp.responseType = "json";
            xmlhttp.onloadend = () => {
                console.log("Response: " + JSON.stringify(xmlhttp.response));
                // 
            }
            xmlhttp.setRequestHeader("Authorization", `Bearer ${token}`);
            xmlhttp.send();
        });
    }


    generateToolbarContent() {
        const {loginWithRedirect} = this.props.auth0;
        return (
            <Button variant={"contained"} onClick={() => loginWithRedirect()}> Log in</Button>
        );
    }

    generateContent() {
        return (
            <Grid container alignItems={"center"} justify={"center"}>
                <Grid item xs={12}>
                    <Typography variant={"h2"} id={"test"}> Welcome to FRC Team 190's website! </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={"h4"}> Please log in with your Slack account to view your records, register for
                        events, and vote. </Typography>
                    <Button size={"large"} variant={"contained"} color={"primary"}> Log in</Button>
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
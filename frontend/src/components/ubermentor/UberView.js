import React from "react";
import UberBackground from "./UberBackground";
import {Grid, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import AllRequests from "./AllRequests";
import LambdaAPI from "../utility/LambdaAPI";

class UberView extends React.Component {

    componentDidMount() {
        LambdaAPI.RETURN_ROLE(this.props.auth0, (role) => {
            if (role !== "ubermentor") {
                window.location.href = "#/welcome";
            }
        });
    }

    generateContent() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Active requests to approve </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AllRequests/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Create </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }


    render() {
        return (
            <UberBackground content={this.generateContent()}/>
        )
    }
}

export default withAuth0(UberView);
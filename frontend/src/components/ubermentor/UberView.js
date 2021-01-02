import React from "react";
import UberBackground from "./UberBackground";
import {Grid, Typography} from "@material-ui/core";
import LambdaAPI from "../utility/LambdaAPI";
import {withAuth0} from "@auth0/auth0-react";

class UberView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }

    generateTable() {
        // const data = LambdaAPI.GET("/request/getAll", this.props.auth0);
        const {data} = this.state;
        return (
            {data}
        );
    }

    generateContent() {
        console.log(this.generateTable());
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Active requests to approve </Typography>
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
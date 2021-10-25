import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import Approvals from "./Approvals";
import StudentBackground from "./StudentBackground";
import RecordTables from "./RecordTables";
import EventSignup from "./EventSignup";

class StudentView extends React.Component {

    generateContent() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <RecordTables/>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Request approval </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Approvals/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Event signup </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <EventSignup />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <StudentBackground content={this.generateContent()}/>
        );
    }
}

export default withAuth0(StudentView);
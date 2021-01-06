import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import Approvals from "./Approvals";
import StudentBackground from "./StudentBackground";
import RecordTables from "./RecordTables";
import LambdaAPI from "../utility/LambdaAPI";
import AllStudentRequests from "../student/AllStudentRequests";

class Requests extends React.Component {

    componentDidMount() {
        LambdaAPI.RETURN_ROLE(this.props.auth0, (role) => {
            if (role === "undefined") {
                window.location.href = "#/welcome";
            }
        });
    }

    generateContent() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Current Pending Requests </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AllStudentRequests/>
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

export default withAuth0(Requests);
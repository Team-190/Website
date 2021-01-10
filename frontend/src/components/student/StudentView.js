import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import Approvals from "./Approvals";
import StudentBackground from "./StudentBackground";
import RecordTables from "./RecordTables";
import LambdaAPI from "../utility/LambdaAPI";

class StudentView extends React.Component {

    componentDidMount() {
        LambdaAPI.RETURN_ROLE(this.props.auth0, (role) => {
            if (role === "undefined") {
                window.location.href = "#/welcome";
            } else {
                this.setState({role: role});
            }
        });
    }

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
import React from "react";
import Background from "../background/Background";
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import EventTable from "../utility/EventTable";
import HoursTable from "../utility/HoursTable";
import RequestHours from "./RequestHours";
import {withAuth0} from "@auth0/auth0-react";
import RequestEvent from "./RequestEvent";
import Requirements from "./Requirements";
import RequestMeeting from "./RequestMeeting";
import RequestSupport from "./RequestSupport";

const styles = {
    tables: {
        padding: "1%"
    },
    formControl: {
        width: "100%"
    },
    heading: {
        width: "100%"
    }
}

class StudentView extends React.Component {
    tables = [
        <EventTable title={"Upcoming Events"} secondaryTitle={"Date"} rows={[]}/>,
        <EventTable title={"Your Events"} secondaryTitle={"Date"} rows={[]}/>,
        <HoursTable title={"Operations Hours"} rows={[]}/>,
        <HoursTable title={"Support Tasks"} rows={[]}/>,
    ];


    generateToolbarContent() {
        return (
            <Grid container spacing={4}>
                <Grid item>
                    <Button variant={"contained"}> Slack </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Requests </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Travel Team Requirements </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Voting </Button>
                </Grid>
            </Grid>
        );
    }

    generateContent() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid container spacing={3} style={styles.tables}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Your data </Typography>
                        </Grid>
                        {this.tables.map((table, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardContent>{table}</CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Request approvals </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <RequestMeeting/>
                        </Grid>
                        <Grid item xs={6}>
                            <RequestHours/>
                        </Grid>
                        <Grid item xs={6}>
                            <RequestEvent/>
                        </Grid>
                        <Grid item xs={6}>
                            <RequestSupport/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        // Post, then
        // this.tables[0] = <EventTable title={"Test"} rows={["a","b"]}/>;
        this.forceUpdate();
    }

    render() {
        return (
            <Background toolbarContent={this.generateToolbarContent()} content={this.generateContent()}/>
        );
    }
}

export default withAuth0(StudentView);
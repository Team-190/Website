import React from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import EventTable from "../utility/EventTable";
import HoursTable from "../utility/HoursTable";
import {withAuth0} from "@auth0/auth0-react";
import Approvals from "./Approvals";
import StudentBackground from "./StudentBackground";
import YearChooser from "./YearChooser";

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
    constructor(props) {
        super(props);
        this.state = {
            tables: [
                <EventTable title={"Upcoming events"} rows={[]}/>,
                <EventTable title={"Your events"} rows={[]}/>,
                <EventTable title={"Your meetings"} rows={[]}/>,
                <HoursTable title={"Operations hours"} rows={[]}/>,
                <HoursTable title={"Support tasks"} rows={[]}/>,
            ]
        }
    }

    componentDidMount() {
        // Post, then update this.state.tables
    }

    generateContent() {
        const {tables} = this.state;
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid container spacing={3} style={styles.tables}>
                        <Grid item xs={10}>
                            <Typography variant={"h4"}> Your data </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <YearChooser/>
                        </Grid>
                        {tables.map((table, index) => {
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
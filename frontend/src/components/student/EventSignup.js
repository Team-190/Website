import React from "react";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";

class EventSignup extends React.Component {

    // Get all future events with space available
    // Render them in a list

    constructor(props) {
        super(props);
        this.events = [
            {
                "name": "Test",
                "dates": [{"date": "01/08/2022", "startTime": "00000", "endTime": "000000"}],
                "event_type": "Demo",
                "location": "Southboro"
            },
            {
                "name": "Test 2",
                "dates": [{"date": "01/08/2022", "startTime": "00000", "endTime": "000000"}],
                "event_type": "Off-season",
                "location": "Southboro"
            }]

    }

    render() {
        return (
            <Grid container spacing={3}>
                {this.events.map((value) => {
                    return (
                        <Grid item xs={12}>
                            <Card style={{"padding":5}}>
                                <Typography variant={"h5"}>{value.event_type}: {value.name}</Typography>
                                {value.dates.map((date) => {
                                    return (
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography variant={"body2"}>{date.date}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant={"body2"}>Starts: {date.startTime}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant={"body2"}>Ends: {date.endTime}</Typography>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                                <Typography variant={"body2"}>Location: {value.location}</Typography>
                                <div />
                                <Button variant={"contained"} color={"primary"}>Sign-up</Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

        );
    }
}

export default withAuth0(EventSignup);
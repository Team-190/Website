import React from "react";
import Background from "../background/Background";
import {Button, Card, CardContent, Grid, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import EventTable from "../utility/EventTable";
import HoursTable from "../utility/HoursTable";
import RequestHours from "./RequestHours";
import {withAuth0} from "@auth0/auth0-react";
import RequestEvent from "./RequestEvent";
import Requirements from "./Requirements";
import RequestMeeting from "./RequestMeeting";
import RequestSupport from "./RequestSupport";
import TabPanel from "../utility/TabPanel";
import {Link} from "react-router-dom";
import StudentBackground from "./StudentBackground";

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

    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({tab: value})
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
                        <Grid item xs={12}>
                            <Paper>
                                <Tabs
                                    value={this.state.tab}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    <Tab label="Weekly Meetings" />
                                    <Tab label="Hours" />
                                    <Tab label="Events" />
                                    <Tab label={"Support"}/>
                                </Tabs>
                                <TabPanel value={this.state.tab} index={0} content={<RequestMeeting/>}/>
                                <TabPanel value={this.state.tab} index={1} content={<RequestHours/>}/>
                                <TabPanel value={this.state.tab} index={2} content={<RequestEvent/>}/>
                                <TabPanel value={this.state.tab} index={3} content={<RequestSupport/>}/>
                            </Paper>
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
            <StudentBackground content={this.generateContent()}/>
        );
    }
}

export default withAuth0(StudentView);
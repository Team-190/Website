import React from "react";
import EventTable from "../utility/EventTable";
import HoursTable from "../utility/HoursTable";
import {Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import LambdaAPI from "../utility/LambdaAPI";

const styles = {
    heading: {
        fontWeight: "bold",
        width: "50%"
    },
    cell: {
        width: "50%"
    }
}


class RecordTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [
                <EventTable title={"Upcoming events"} rows={[]}/>,
                <EventTable title={"Your events"} rows={[]}/>,
                <EventTable title={"Your meetings"} rows={[]}/>,
                <HoursTable title={"Operations hours"} rows={[]}/>,
                <HoursTable title={"Support tasks"} rows={[]}/>,
            ],
            meetings: [],
            events: [],
            hours: [],
            tasks: []
        }
        this.sumHours = this.sumHours.bind(this);
    }

    componentDidMount() {
        LambdaAPI.GET("/records", this.props.auth0).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                let tasks = [];
                let hours = [];
                let meetings = [];
                let events = [];
                for (let i = 0; i < response.length; i++) {
                    const record = response[i];
                    const type = record["record_type"];
                    if (type === "Meeting") {
                        meetings.push({
                            date: record["date"]
                        });
                    } else if (type === "Hours") {
                        hours.push({
                            date: record["date"],
                            hours: parseInt(record["data"])
                        });
                    } else if (type === "Support") {
                        tasks.push({
                            date: record["date"],
                            value: record["data"]
                        });
                    }
                }
                this.setState({
                    meetings: meetings,
                    events: events,
                    tasks: tasks,
                    hours: hours
                })
            }
        });
    }

    sumHours() {
        try {
            return this.state.hours.reduce((rowA, rowB) => parseInt(rowA.hours) + parseInt(rowB.hours));
        } catch (e) {
            return 0;
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant={"h5"}>
                                Events
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.heading}> Event </TableCell>
                                        <TableCell style={styles.heading}> Type </TableCell>
                                        <TableCell style={styles.heading}> Date </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.events.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}> {row.value} </TableCell>
                                                    <TableCell style={styles.cell}> {row.event_type} </TableCell>
                                                    <TableCell style={styles.cell}> {row.date} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading}> Total </TableCell>
                                        <TableCell/>
                                        <TableCell style={styles.heading}>
                                            {this.state.events.length}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant={"h5"}>
                                Weekly meetings
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.heading}> Date </TableCell>
                                        <TableCell style={styles.heading}> Credit </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.meetings.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}> {row.date} </TableCell>
                                                    <TableCell> 1 </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading}> Total </TableCell>
                                        <TableCell style={styles.heading}>
                                            {this.state.meetings.length}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant={"h5"}>
                                Operation hours
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.heading}> Date </TableCell>
                                        <TableCell style={styles.heading}> Hours </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.hours.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}> {row.date} </TableCell>
                                                    <TableCell style={styles.cell}> {row.hours} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading}> Total </TableCell>
                                        <TableCell
                                            style={styles.heading}>
                                                {this.sumHours()}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant={"h5"}>
                                Support tasks
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.heading}> Date </TableCell>
                                        <TableCell style={styles.heading}> Support task </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.tasks.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}> {row.date} </TableCell>
                                                    <TableCell style={styles.cell}> {row.value} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading}> Total </TableCell>
                                        <TableCell
                                            style={styles.heading}>
                                            {this.state.tasks.length}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }


}

export default withAuth0(RecordTables);
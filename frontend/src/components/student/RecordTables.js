import React from "react";
import {
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import LambdaAPI from "../utility/LambdaAPI";

const styles = {
    heading: {
        fontWeight: "bold",
        width: "50%"
    },
    cell: {
        width: "50%"
    },
    formControl: {
        width: "100%"
    }
}


class RecordTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: [],
            events: [],
            hours: [],
            totalHours: 0,
            tasks: [],
            years: this.createYearList(),
            selectedYear: new Date().getFullYear().toString()
        }
        this.sumHours = this.sumHours.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateYears = this.generateYears.bind(this);
    }

    handleChange(event) {
        this.setState({selectedYear: event.target.value});
    }

    createYearList() {
        let list = [];
        for (let year = new Date().getFullYear(); year >= 2021; year--) {
            list.push(year.toString());
        }
        return list;
    }

    generateYears() {
        return this.state.years.map((value) => {
            return (
                <MenuItem value={value} key={value}>{value}</MenuItem>
            );
        });
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
                let totalHours = 0;
                for (let i = 0; i < response.length; i++) {
                    const record = response[i];
                    const type = record["record_type"];
                    const {selectedYear} = this.state;
                    if (type === "Total Hours" || (type === "Hours" && JSON.parse(record["date"])["year"] === selectedYear) || record["date"].split("/")[2] === selectedYear) {
                        if (type === "Meeting") {
                            meetings.push({
                                date: record["date"]
                            });
                        } else if (type === "Hours") {
                            const date = JSON.parse(record["date"]);
                            hours.push({
                                year: date["year"],
                                week: date["week"],
                                hours: record["data"]
                            });
                        } else if (type === "Support") {
                            tasks.push({
                                date: record["date"],
                                value: record["data"]
                            });
                        } else if (type === "Total Hours") {
                            totalHours = record["data"]
                        }
                    }
                }
                this.setState({
                    meetings: meetings,
                    events: events,
                    tasks: tasks,
                    hours: hours,
                    totalHours: totalHours
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
        const {selectedYear} = this.state;
        return (
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography variant={"h4"}> Your data </Typography>
                </Grid>
                <Grid item xs={2}>
                    <FormControl style={styles.formControl}>
                        <InputLabel id={"studentYearLabel"}> Year </InputLabel>
                        <Select required labelId={"studentYearLabel"}
                                id={"studentYear"} onChange={this.handleChange}
                                value={selectedYear}>
                            {this.generateYears()}
                        </Select>
                    </FormControl>
                </Grid>
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
                                        <TableCell style={styles.heading}> Week </TableCell>
                                        <TableCell style={styles.heading}> Hours </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.hours.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}> {row.week} </TableCell>
                                                    <TableCell style={styles.cell}> {row.hours} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading}> Total </TableCell>
                                        <TableCell style={styles.heading}>{this.state.totalHours}</TableCell>
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
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
        width: "50%",
        paddingNone: "true"
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
            selectedYear: new Date().getFullYear().toString(),
            users: null,
            selectedUser: null
        }
        this.sumHours = this.sumHours.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.generateYears = this.generateYears.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);

    }

    handleYearChange(event) {
        this.setState({selectedYear: event.target.value});
    }

    handleUserChange(event) {
        this.setState({selectedUser: event.target.value});
        this.loadRecordsFromAPI(event.target.value.email);
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

    loadRecordsFromAPI(email) {
        let url = "/records";

        if (!!email) {
            url = `/records?email=${email}`
        }
        console.log("loading")

        LambdaAPI.GET(url, this.props.auth0).then(tuple => {
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
                    if (type === "Total Hours" || (type === "Hours" && JSON.parse(record["date"])["year"].toString() === selectedYear) || record["date"].split("/")[2] === selectedYear) {
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

    componentDidMount() {
        LambdaAPI.GET("/all_users", this.props.auth0).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                this.setState({
                    users: response.users,
                    selectedUser: response.users[0]
                });
                this.loadRecordsFromAPI(response.users[0].email);
            } else if (status === 403) {
                this.loadRecordsFromAPI(null);
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

    generateUsers(users) {
        return users.sort((a,b) => a["member_name"].toLowerCase() > b["member_name"].toLowerCase()).map(user => {
            return (
                <MenuItem value={user} key={user["member_name"]}>{user["member_name"]}</MenuItem>
            )
        });
    }

    render() {
        const {selectedYear} = this.state;
        const {users} = this.state;
        const {selectedUser} = this.state;
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant={"h4"}> Your data </Typography>
                </Grid>

                {!!users &&
                <Grid item xs={4}>
                    <FormControl style={styles.formControl}>
                        <InputLabel id={"userLabel"}> User </InputLabel>
                        <Select required labelId={"userLabel"}
                                id={"user"} onChange={this.handleUserChange}
                                value={selectedUser}>
                            {this.generateUsers(users)}
                        </Select>
                    </FormControl>
                </Grid>
                }
                <Grid item xs={2}>
                    <FormControl style={styles.formControl}>
                        <InputLabel id={"studentYearLabel"}> Year </InputLabel>
                        <Select required labelId={"studentYearLabel"}
                                id={"studentYear"} onChange={this.handleYearChange}
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
                                        <TableCell style={styles.heading} size={"small"}> Event </TableCell>
                                        <TableCell style={styles.heading} size={"small"}> Type </TableCell>
                                        <TableCell style={styles.heading} size={"small"}> Date </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.events.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.value} </TableCell>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.event_type} </TableCell>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.date} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading} size={"small"}> Total </TableCell>
                                        <TableCell size={"small"}/>
                                        <TableCell style={styles.heading} size={"small"}>
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
                                        <TableCell style={styles.heading} size={"small"}> Date </TableCell>
                                        <TableCell style={styles.heading} size={"small"}> Credit </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.meetings.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.date} </TableCell>
                                                    <TableCell style={styles.cell} size={"small"}> 1 </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading} size={"small"}> Total </TableCell>
                                        <TableCell style={styles.heading} size={"small"}>
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
                                        <TableCell style={styles.heading} size={"small"}> Week </TableCell>
                                        <TableCell style={styles.heading} size={"small"}> Hours </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.hours.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.week} </TableCell>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.hours} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading} size={"small"}> Total </TableCell>
                                        <TableCell style={styles.heading}
                                                   size={"small"}>{this.state.totalHours}</TableCell>
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
                                        <TableCell style={styles.heading} size={"small"}> Date </TableCell>
                                        <TableCell style={styles.heading} size={"small"}> Support task </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.tasks.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.date} </TableCell>
                                                    <TableCell style={styles.cell}
                                                               size={"small"}> {row.value} </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                    <TableRow>
                                        <TableCell style={styles.heading} size={"small"}> Total </TableCell>
                                        <TableCell
                                            style={styles.heading} size={"small"}>
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
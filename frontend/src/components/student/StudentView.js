import React from "react";
import Background from "../background/Background";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import FRCTable from "../utility/FRCTable";
import HoursTable from "../utility/HoursTable";

const styles = {
    tables: {
        padding: "1%"
    },
    formControl: {
        width: "100%"
    },
}

class StudentView extends React.Component {
    tables = [
        <FRCTable title={"Upcoming Events"} secondaryTitle={"Date"} rows={[]}/>,
        <HoursTable title={"Operations Hours"} rows={[]}/>,
        <FRCTable title={"Your Events"} secondaryTitle={"Date"} rows={[]}/>,
        <HoursTable title={"Support Hours"} rows={[]}/>,
        <FRCTable title={"Votes"} secondaryTitle={"Date"} rows={[]}/>
    ];

    constructor(props) {
        super(props);
        this.state = {
            hoursSelected: "",
            hoursError: true,
            weekSelected: "",
            weekError: true
        }
        this.handleWeekChange = this.handleWeekChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
    }

    handleHourChange(event) {
        this.setState({ hoursSelected: event.target.value, hoursError: !event.target.value});
    }

    handleWeekChange(event) {
        this.setState({ weekSelected: event.target.value, weekError: !event.target.value});
    }

    generateToolbarContent() {
        return (

            <Grid container spacing={4}>
                <Grid item>
                    <Button variant={"contained"}> Slack </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Hours </Button>
                </Grid>
                <Grid item>
                    <Button variant={"contained"}> Events </Button>
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
                <Grid item xs={4} style={{width: "100%"}}>
                    <Typography variant={"h4"}> Requirements for travel team </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={3} style={styles.tables}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Your data </Typography>
                        </Grid>
                        {this.tables.map((table,index) => {
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
                <Grid item xs={4}>
                    <Card>
                        <CardContent>

                            <Typography variant={"h5"}>
                                Request approval for hours worked
                            </Typography>
                            <form className="CreateChoiceForm" onSubmit={(event) => {
                                event.preventDefault()
                            }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl style={styles.formControl}>
                                            <InputLabel id={"studentApprovalHourLabel"}> Type of hours </InputLabel>
                                            <Select required labelId={"studentApprovalHourLabel"}
                                                    id={"studentApprovalHourType"} onChange={this.handleHourChange} value={this.state.hoursSelected}>
                                                <MenuItem value={"Support"}>Support</MenuItem>
                                                <MenuItem value={"Operations"}>Operations</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl style={styles.formControl}>
                                            <TextField required type={"number"} id={"hoursWorked"} placeholder={"0"}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl style={styles.formControl}>
                                            <InputLabel id={"studentApprovalWeekLabel"}> Week earned </InputLabel>
                                            <Select required labelId={"studentApprovalWeekLabel"}
                                                    id={"studentApprovalWeek"} onChange={this.handleWeekChange} value={this.state.weekSelected}>
                                                {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                                                    return (
                                                        <MenuItem key={value} value={value}>Week {value}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant={"contained"} color={"primary"}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        // Post, then
        // this.tables[0] = <FRCTable title={"Test"} rows={["a","b"]}/>;
        this.forceUpdate();
    }

    render() {
        return (
            <Background toolbarContent={this.generateToolbarContent()} content={this.generateContent()}/>
        );
    }
}

export default StudentView;
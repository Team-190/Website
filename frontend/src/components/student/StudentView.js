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
        padding: "2%"
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
            <Grid container>
                <Grid item xs={9}>
                    <Grid container spacing={3} style={styles.tables}>
                        <Grid item xs={12}>
                            <Typography variant={"h3"}> Your data </Typography>
                        </Grid>
                        {this.tables.map((row) => {
                            return (
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>{row}</CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
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
                                                        id={"studentApprovalHourType"}>
                                                    <MenuItem value={"Support"}>Support</MenuItem>
                                                    <MenuItem value={"Operations"}>Operations</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl style={styles.formControl}>
                                                <TextField required type={"number"} id={"hoursWorked"} placeholder={0}/>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl style={styles.formControl}>
                                                <InputLabel id={"studentApprovalWeekLabel"}> Week earned </InputLabel>
                                                <Select required labelId={"studentApprovalWeekLabel"}
                                                        id={"studentApprovalWeek"}>
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
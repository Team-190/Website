import React from "react";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import {withAuth0} from "@auth0/auth0-react";
import {AddCircleOutline} from "@material-ui/icons";

const styles = {
    formControl: {
        width: "100%"
    },
    time: {
        width: "50%"
    }
}


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventSelected: "Demo",
            dateError: true,
            name: "",
            dates: [[new Date(), new Date(), new Date()]],
            dateSelectors: [0]
        }
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.generateDaySelector = this.generateDaySelector.bind(this);
        this.addDay = this.addDay.bind(this);
    }

    handleEventTypeChange(event) {
        this.setState({eventSelected: event.target.value});
    }

    handleDateChange(number, date, index) {
        let {dates} = this.state;
        dates[number][index] = date;
        this.setState({dates: dates});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    generateDaySelector(index) {
        return (
            <Grid container spacing={3} key={index}>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>Day {index}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            id="date-picker-inline"
                            label="Day"
                            value={this.state.dates[index][0]}
                            onChange={(date) => this.handleDateChange(0, date, 0)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={styles.time}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            disableToolbar
                            ampm={false}
                            variant="inline"
                            label="Start time"
                            value={this.state.dates[index][1]}
                            onChange={(date) => this.handleDateChange(index, date, 1)}
                            style={styles.time}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            ampm={false}
                            variant="inline"
                            label="End time"
                            value={this.state.dates[index][2]}
                            onChange={(date) => this.handleDateChange(index, date, 2)}
                            style={styles.time}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
        );
    }

    addDay() {
        let {dateSelectors, dates} = this.state;
        dates.push([new Date(), new Date(), new Date()]);
        dateSelectors.push(0);
        this.setState({dateSelectors: dateSelectors, dates: dates});
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={"h5"}>
                        Create new event
                    </Typography>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl style={styles.formControl}>
                                    <InputLabel id={"studentApprovalEventTypeLabel"}> Type of event </InputLabel>
                                    <Select required labelId={"studentApprovalEventTypeLabel"}
                                            id={"studentApprovalEventType"} onChange={this.handleEventTypeChange}
                                            value={this.state.eventSelected}>
                                        <MenuItem value={"Demo"}>Demo</MenuItem>
                                        <MenuItem value={"Competition"}>Competition</MenuItem>
                                        <MenuItem value={"Off-season"}>Off-season</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required style={styles.formControl} onChange={this.handleNameChange}
                                           placeholder={"Name"}/>
                            </Grid>
                            {this.state.dateSelectors.map((item, index) => {return this.generateDaySelector(index)})}
                            <Grid item xs={12}>
                                <IconButton onClick={this.addDay}>
                                    <AddCircleOutline/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant={"contained"} color={"primary"}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default withAuth0(CreateEvent);
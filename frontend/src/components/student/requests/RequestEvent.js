import React from "react";
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
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import {withAuth0} from "@auth0/auth0-react";

const styles = {
    formControl: {
        width: "100%"
    },
}


class RequestEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventSelected: "Other",
            dateSelected: new Date(),
            dateError: true
        }
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleEventTypeChange(event) {
        this.setState({eventSelected: event.target.value});
    }

    handleDateChange(date) {
        this.setState({dateSelected: date, weekError: !date});
    }

    generateEvents() {
        // todo get events from this year
        return [];
    }

    otherTextfield() {
        if (this.state.eventSelected === "Other") {
            return (
                <Grid item xs={12}>
                    <FormControl style={styles.formControl}>
                        <TextField required label="Event name or description" multiline={true}/>
                    </FormControl>
                </Grid>
            );
        }
        return null;
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={"h5"}>
                        Request approval for event
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
                                        {this.generateEvents()}
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {this.otherTextfield()}
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Date earned"
                                        value={this.state.dateSelected}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={styles.formControl}
                                    />
                                </MuiPickersUtilsProvider>
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

export default withAuth0(RequestEvent);
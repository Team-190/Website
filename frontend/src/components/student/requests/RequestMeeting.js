import React from "react";
import {Button, Card, CardContent, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import {withAuth0} from "@auth0/auth0-react";

const styles = {
    formControl: {
        width: "100%"
    },
}


class RequestMeeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelected: new Date(),
            dateError: true
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    handleDateChange(date) {
        this.setState({dateSelected: date, weekError: !date});
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={"h5"}>
                        Sign in to weekly meeting
                    </Typography>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Date of meeting"
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
                                <FormControl style={styles.formControl}>
                                    <TextField required label={"Code word"}/>
                                </FormControl>
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

export default withAuth0(RequestMeeting);
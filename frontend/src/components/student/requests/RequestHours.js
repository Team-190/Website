import React from "react";
import {Button, Card, CardContent, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import {withAuth0} from "@auth0/auth0-react";
import RequestDialog from "./RequestDialog";
import LambdaAPI from "../../utility/LambdaAPI";

const styles = {
    formControl: {
        width: "100%"
    },
}


class RequestHours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelected: new Date(),
            dateError: true,
            hours: 0,
            dialogOpen: false,
            response: ""
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleOpenDialog() {
        this.setState({dialogOpen: true});
    }

    handleCloseDialog() {
        this.setState({dialogOpen: false});
    }

    handleDateChange(date) {
        this.setState({dateSelected: date, weekError: !date});
    }

    handleHoursChange(event) {
        this.setState({hours: event.target.value});
    }

    handleClick() {
        const {dateSelected} = this.state;
        let dd = String(dateSelected.getDate()).padStart(2, '0');
        let mm = String(dateSelected.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = dateSelected.getFullYear();
        const data = {
            date: mm + '/' + dd + '/' + yyyy,
            requestType: "Hours",
            data: this.state.hours
        }

        LambdaAPI.POST("/request", this.props.auth0, data).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                this.setState({response: response["message"]});
                this.handleOpenDialog();
            } else {
                console.log(`An unexpected code was encountered. ${status}`)
            }
        });
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={"h5"}>
                        Request approval for hours worked
                    </Typography>
                    <RequestDialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}
                                   title={this.state.response}/>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl style={styles.formControl}>
                                    <TextField required type={"number"} placeholder={"0 hours"}
                                               onChange={this.handleHoursChange}/>
                                </FormControl>
                            </Grid>
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
                                <Button variant={"contained"} color={"primary"}
                                        onClick={this.handleClick}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default withAuth0(RequestHours);
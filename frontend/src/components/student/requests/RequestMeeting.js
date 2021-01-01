import React from "react";
import {Button, Card, CardContent, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import {withAuth0} from "@auth0/auth0-react";
import RequestDialog from "./RequestDialog";

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
            dateError: true,
            codeWord: "",
            dialogOpen: false,
            response: ""
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCodeWordChange = this.handleCodeWordChange.bind(this);
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

    handleCodeWordChange(event) {
        this.setState({codeWord: event.target.value});
    }

    handleClick() {
        let {getAccessTokenSilently} = this.props.auth0;
        const {dateSelected} = this.state;
        // getAccessTokenSilently = getAccessTokenSilently.bind(dateSelected);

        getAccessTokenSilently({audience: "team190", scopes: "openid profile email"}).then((token) => {
            const api_url = "https://c22onf2w15.execute-api.us-east-1.amazonaws.com/production/request";
            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            xmlhttp.open("POST", api_url, true);
            xmlhttp.responseType = "json";
            xmlhttp.onloadend = () => {
                console.log("Response: " + JSON.stringify(xmlhttp.response));
                if (xmlhttp.status === 200) {
                    this.setState({response: xmlhttp.response["message"]});
                    this.handleOpenDialog();
                } else {
                    console.log(`An unexpected code was encountered. ${xmlhttp.status}`)
                }
            }
            xmlhttp.setRequestHeader("Authorization", `Bearer ${token}`);
            let dd = String(dateSelected.getDate()).padStart(2, '0');
            let mm = String(dateSelected.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = dateSelected.getFullYear();

            const data = {
                date: mm + '/' + dd + '/' + yyyy,
                requestType: "meeting",
                data: `{code_word: ${this.state.codeWord}}`
            }
            console.log("Request: " + JSON.stringify(data));
            xmlhttp.send(JSON.stringify(data));
        });
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={"h5"}>
                        Sign in to weekly meeting
                    </Typography>
                    <RequestDialog open={this.state.dialogOpen} onClose={this.handleCloseDialog} title={this.state.response}/>
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
                                    <TextField required label={"Code word"} onChange={this.handleCodeWordChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant={"contained"} color={"primary"} onClick={this.handleClick}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default withAuth0(RequestMeeting);
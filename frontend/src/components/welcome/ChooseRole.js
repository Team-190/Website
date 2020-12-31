import React from "react";
import {withAuth0} from "@auth0/auth0-react";
import Background from "../background/Background";
import {Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";

const styles = {
    formControl: {
        minWidth: 100
    }
}

class ChooseRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: "", hasError: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const {getAccessTokenSilently} = this.props.auth0;
        this.setState(state => ({hasError: !state.selected}));
        const {hasError} = this.state;
        if (!hasError) {
            getAccessTokenSilently({audience: "team190", scopes: "openid profile email"}).then((token) => {
                const api_url = "https://c22onf2w15.execute-api.us-east-1.amazonaws.com/production/choose";
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", api_url, true);
                xmlhttp.responseType = "json";
                xmlhttp.onloadend = () => {
                    console.log("Response: " + JSON.stringify(xmlhttp.response));
                    console.log(xmlhttp.status);
                    if (xmlhttp.status === 200) {
                        // Redirect to role-respective page
                        let role = xmlhttp.response["message"];
                        if (role === "ubermentor") {
                            // redirect to /ubermentor
                        } else {
                            // redirect to /student
                            window.location.href = "#/student";
                        }
                    } else {
                        console.log(`An unexpected code was encountered. ${xmlhttp.status}`)
                    }
                }
                xmlhttp.setRequestHeader("Authorization", `Bearer ${token}`);
                const data = {
                    "role": this.state.selected
                };
                console.log("Request: "+ JSON.stringify(data))
                xmlhttp.send(JSON.stringify(data));
            });
        }
    }

    handleChange(event) {
        this.setState({ selected: event.target.value, hasError: !event.target.value});
    }

    generateToolbarContent() {
        return (
            <Button variant={"contained"}> Log in</Button>
        );
    }

    generateContent() {
        const {selected, hasError} = this.state;
        return (
            <form className="CreateChoiceForm" onSubmit={(event) => {
                event.preventDefault()
            }} autoComplete={"off"}>
                <Grid container justify={"center"} spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}> Please select your role on Team 190</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl style={styles.formControl}>
                            <InputLabel id={"roleSelectionLabel"} htmlFor={"roleSelection"}> I am a... </InputLabel>
                            <Select
                                name={"roleSelection"}
                                labelId={"roleSelectionLabel"}
                                onChange={this.handleChange}
                                value={selected}
                            >
                                <MenuItem value={"student"}>Student</MenuItem>
                                <MenuItem value={"mentor"}>Mentor</MenuItem>
                            </Select>
                            {hasError && <FormHelperText>This is required!</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={"contained"} color={"primary"} type={"submit"}
                                onClick={() => this.handleSubmit()}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }

    render() {
        return (
            <Background toolbarContent={this.generateToolbarContent()} content={this.generateContent()}/>
        );
    }
}

export default withAuth0(ChooseRole);
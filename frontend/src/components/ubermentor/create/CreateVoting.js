import React from "react";
import {Button, Card, CardContent, FormControl, Grid, TextField, Typography} from "@material-ui/core";

import {withAuth0} from "@auth0/auth0-react";
import RequestDialog from "./RequestDialog";
import LambdaAPI from "../../utility/LambdaAPI";

const styles = {
    formControl: {
        width: "100%"
    },
};

class CreateVoting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            dateSelected: new Date(),
            dateError: true,
            dialogOpen: false,
            response: "",
            choices: ""
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleChoicesChange = this.handleChoicesChange.bind(this);
    }

    handleOpenDialog() {
        this.setState({dialogOpen: true});
    }

    handleCloseDialog() {
        this.setState({dialogOpen: false});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleChoicesChange(event){
        this.setState({choices: event.target.value});
    }

    handleDateChange(date) {
        this.setState({dateSelected: date, weekError: !date});
    }

    handleClick() {

        const data = {
            description: this.state.description,
            choices: this.state.choices.split("\n"),
        };

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
                        Create a new voting question
                    </Typography>
                    <RequestDialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}
                                   title={this.state.response}/>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl style={styles.formControl}>
                                    <TextField required label="Name of the poll" className="TextEntry" multiline={true}
                                               onChange={this.handleDescriptionChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={styles.formControl}>
                                    <TextField required label="Enter the choices (each choice on a new line)." className="TextEntry" multiline={true}
                                               onChange={this.handleChoicesChange}/>
                                </FormControl>
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

export default withAuth0(CreateVoting);
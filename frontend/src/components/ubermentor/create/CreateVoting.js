import React from "react";
import {Button, Card, CardContent, FormControl, Grid, IconButton, TextField, Typography} from "@material-ui/core";

import {withAuth0} from "@auth0/auth0-react";
import RequestDialog from "./RequestDialog";
import LambdaAPI from "../../utility/LambdaAPI";
import {AddCircleOutline} from "@material-ui/icons";

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
            response: "",
            choices: [""],
            choiceSelectors: [0]
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleChoicesChange = this.handleChoicesChange.bind(this);
        this.addChoice = this.addChoice.bind(this);
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

    handleChoicesChange(event, index){
        console.log(index + " changed");
        let {choices} = this.state;
        choices[index] = event.target.value;
        this.setState({choices: choices});
    }

    generateChoiceSelector(index) {
        return (
            <Grid container spacing={3} key={index}>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>Choice {index+1}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl style={styles.formControl}>
                        <TextField required label="Enter the choice." className="TextEntry" multiline={true}
                                   onChange={(event) => this.handleChoicesChange(event, index)}/>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }

    addChoice() {
        let {choiceSelectors, choices} = this.state;
        choiceSelectors.push(0);
        choices.push("");
        this.setState({choiceSelectors: choiceSelectors, choices: choices});
    }


    handleClick() {
        const data = {
            description: this.state.description,
            choices: this.state.choices
        };

        console.log(data);

        LambdaAPI.POST("/voting", this.props.auth0, data).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                this.setState({response: response["message"]});
                this.handleOpenDialog();
                console.log(`Successful. ${status}`);
            } else {
                console.log(`An unexpected code was encountered. ${status}`);
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
                            {this.state.choiceSelectors.map((item, index) => {return this.generateChoiceSelector(index)})}
                            <Grid item xs={12}>
                                <IconButton onClick={this.addChoice}>
                                    <AddCircleOutline/>
                                </IconButton>
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

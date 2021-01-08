import React from "react";
import {Button, Card, CardContent, Checkbox, FormControl, FormGroup, FormLabel, Grid, IconButton, TextField, Typography} from "@material-ui/core";

import {withAuth0} from "@auth0/auth0-react";
import RequestDialog from "./RequestDialog";
import LambdaAPI from "../../utility/LambdaAPI";
import {AddCircleOutline, RemoveCircleOutline} from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
    formControl:{
        width: "90%"
    },

    formControlRest: {
        width: "83%"
    }
};

class CreateVoting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            response: "",
            choices: [""],
            choiceSelectors: [0],
            audience: []
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleChoicesChange = this.handleChoicesChange.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.handleStudentClick = this.handleStudentClick.bind(this);
        this.handleMentorClick = this.handleMentorClick.bind(this);
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

    handleChoicesChange(event, index) {
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
                    <FormControl style={(index !== 0 ? styles.formControlRest : styles.formControl)}>
                        <TextField required label="Enter the choice." className="TextEntry" multiline={true} value={this.state.choices[index]}
                                   onChange={(event) => this.handleChoicesChange(event, index)}/>
                    </FormControl>
                    {(index !== 0 ? <IconButton onClick={() => this.removeChoice(index)}><RemoveCircleOutline/></IconButton> : null)}
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

    removeChoice(index) {
        let {choiceSelectors, choices} = this.state;
        choiceSelectors.splice(index, 1);
        choices.splice(index, 1);
        this.setState({choiceSelectors: choiceSelectors, choices: choices});
    }


    handleClick() {
        const data = {
            description: this.state.description,
            choices: this.state.choices,
            audience: this.state.audience
        };
        let {audience, description, choices} = this.state;
        if(audience.length === 0){
            alert("You must select at least one audience (student, mentor, or both).");
            return;
        }
        if(description === ""){
            alert("The name of the poll must not be empty.");
            return;
        }
        let empty = false;
        choices.forEach((v) => {
            if(v === ""){
                empty = true;
            }
        });
        if(empty){
            alert("One of the choices is empty.");
            return;
        }

        if(description === ""){
            alert("The name of the poll must not be empty");
            return;
        }

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

    handleStudentClick(event) {
        let checked = event.target.checked;
        let {audience} = this.state;
        if(checked){
            audience.push("student");
            console.log("student added")
        }
        else{
            const ind = audience.indexOf("student");
            if(ind > -1)
                audience.splice(ind, 1);
            console.log("student removed")
        }
        this.setState({audience: audience});
        console.log(audience);

    }

    handleMentorClick(event){
        let checked = event.target.checked;
        let {audience} = this.state;
        if(checked){
            audience.push("mentor");
            console.log("mentor added")
        }
        else{
            const ind = audience.indexOf("mentor");
            if(ind > -1)
                audience.splice(ind, 1);
            console.log("mentor removed")
        }
        this.setState({audience: audience});
        console.log(audience);

    }


    render() {
        let {audience} = this.state;
        const error = audience.filter((v) => v).length === 0;
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
                            <Grid item xs={12} alignItems="center">
                                <Grid container justify="center">
                                    <FormControl required error={error} component="fieldset">
                                        <FormLabel classname="label" component="legend">Select at least one</FormLabel>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={<Checkbox name="checkedA" />}
                                                label="Student"
                                                onChange={this.handleStudentClick}
                                            />
                                            <FormControlLabel
                                                control={<Checkbox name="checkedA" />}
                                                label="Mentor"
                                                onChange={this.handleMentorClick}
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
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

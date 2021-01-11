import React from "react";
import {Button, Card, CardContent, Checkbox, FormControl, FormGroup, Grid, IconButton, TextField, Typography} from "@material-ui/core";

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
            audience: [],
            audienceHidden: true,
            descriptionError: false,
            descriptionHelperText: "",
            choiceErrors: [],
            choiceErrorMessages: [],
            dialogOpen: false
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
        this.setState({description: event.target.value, descriptionError:false, descriptionHelperText:""});
    }

    handleChoicesChange(event, index) {
        let {choices, choiceErrors, choiceErrorMessages} = this.state;
        choices[index] = event.target.value;
        choiceErrors[index] = false;
        choiceErrorMessages[index] = "";
        this.setState({choices: choices, choiceErrors: choiceErrors, choiceErrorMessages: choiceErrorMessages});
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
                                   onChange={(event) => this.handleChoicesChange(event, index)}
                                   error={this.state.choiceErrors[index]} helperText={this.state.choiceErrorMessages[index]}
                        />
                    </FormControl>
                    {(index !== 0 ? <IconButton onClick={() => this.removeChoice(index)}><RemoveCircleOutline/></IconButton> : null)}
                </Grid>
            </Grid>
        );
    }

    addChoice() {
        let {choiceSelectors, choices, choiceErrors, choiceErrorMessages} = this.state;
        choiceSelectors.push(0);
        choices.push("");
        choiceErrors.push(false);
        choiceErrorMessages.push("");
        this.setState({choiceSelectors: choiceSelectors, choices: choices, choiceErrors: choiceErrors, choiceErrorMessages: choiceErrorMessages});
    }

    removeChoice(index) {
        let {choiceSelectors, choices, choiceErrors, choiceErrorMessages} = this.state;
        choiceSelectors.splice(index, 1);
        choices.splice(index, 1);
        choiceErrors.splice(index, 1);
        choiceErrorMessages.splice(index, 1);
        this.setState({choiceSelectors: choiceSelectors, choices: choices, choiceErrors: choiceErrors, choiceErrorMessages: choiceErrorMessages});

    }


    handleClick() {
        const data = {
            description: this.state.description,
            choices: this.state.choices,
            audience: this.state.audience
        };
        let {audience, description, choices, choiceErrors, choiceErrorMessages} = this.state;
        if(audience.length === 0){
            this.setState({audienceHidden: false});
            return;
        }
        if(description.trim() === ""){
            this.setState({descriptionError: true, descriptionHelperText:"Enter a description"});
            return;
        }

        choices.forEach((v, index) => {
            if(v.trim() === ""){
                choiceErrors[index] = true;
                choiceErrorMessages[index] = "Enter a choice.";
            }
            else{
                choiceErrors[index] = false;
                choiceErrorMessages[index] = "";
            }
        });
        this.setState({choiceErrors: choiceErrors, choiceErrorMessages: choiceErrorMessages});
        if(choiceErrors.some((v) => v===true)) return;

        LambdaAPI.POST("/voting/create", this.props.auth0, data).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                this.setState({response: response["message"]});
                this.handleOpenDialog();
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
        }
        else{
            const ind = audience.indexOf("student");
            if(ind > -1)
                audience.splice(ind, 1);
        }
        this.setState({audience: audience, audienceHidden:true});

    }

    handleMentorClick(event){
        let checked = event.target.checked;
        let {audience} = this.state;
        if(checked){
            audience.push("mentor")
        }
        else{
            const ind = audience.indexOf("mentor");
            if(ind > -1)
                audience.splice(ind, 1);
        }
        this.setState({audience: audience, audienceHidden:true});
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
                                               onChange={this.handleDescriptionChange} error={this.state.descriptionError} helperText={this.state.descriptionHelperText}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                Choose the audience for the poll (students, mentors, or both).
                            </Grid>
                            <Grid item xs={12} alignItems="center">
                                <Grid container justify="center">
                                    <FormControl required error={error} component="fieldset">
                                        <p hidden={this.state.audienceHidden} style={{color:"red"}}>Select at least one</p>
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

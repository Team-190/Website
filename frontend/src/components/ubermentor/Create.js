import React from "react";
import {Paper, Tab, Tabs} from "@material-ui/core";
import TabPanel from "../utility/TabPanel";
import CreateEvent from "./create/CreateEvent";
import CreatePoll from "./create/CreatePoll";
import CreateVoting from "./create/CreateVoting"

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({tab: value})
    }

    render() {
        return (
            <Paper>
                <Tabs
                    value={this.state.tab}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Event"/>
                    <Tab label="Poll"/>
                    <Tab label="Voting"/>
                </Tabs>
                <TabPanel value={this.state.tab} index={0} content={<CreateEvent/>}/>
                <TabPanel value={this.state.tab} index={1} content={<CreatePoll/>}/>
                <TabPanel value={this.state.tab} index={2} content={<CreateVoting/>}/>
            </Paper>
        )
    }
}

export default Create;
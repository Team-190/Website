import React from "react";
import {Paper, Tab, Tabs} from "@material-ui/core";
import TabPanel from "../utility/TabPanel";
import RequestMeeting from "./requests/RequestMeeting";
import RequestHours from "./requests/RequestHours";
import RequestEvent from "./requests/RequestEvent";
import RequestSupport from "./requests/RequestSupport";

class Approvals extends React.Component {
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
                    <Tab label="Weekly Meetings"/>
                    <Tab label="Hours"/>
                    <Tab label="Events"/>
                    <Tab label={"Support"}/>
                </Tabs>
                <TabPanel value={this.state.tab} index={0} content={<RequestMeeting/>}/>
                <TabPanel value={this.state.tab} index={1} content={<RequestHours/>}/>
                <TabPanel value={this.state.tab} index={2} content={<RequestEvent/>}/>
                <TabPanel value={this.state.tab} index={3} content={<RequestSupport/>}/>
            </Paper>
        )
    }
}

export default Approvals;
import React from "react";
import EventTable from "../utility/EventTable";
import HoursTable from "../utility/HoursTable";
import {Card, CardContent, Grid} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";

class RecordTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [
                <EventTable title={"Upcoming events"} rows={[]}/>,
                <EventTable title={"Your events"} rows={[]}/>,
                <EventTable title={"Your meetings"} rows={[]}/>,
                <HoursTable title={"Operations hours"} rows={[]}/>,
                <HoursTable title={"Support tasks"} rows={[]}/>,
            ]
        }
    }


    render() {
        const {tables} = this.state;
        return (
            tables.map((table, index) => {
                return (
                    <Grid item xs={12} key={index}>
                        <Card>
                            <CardContent>{table}</CardContent>
                        </Card>
                    </Grid>
                )
            })
        );
    }


}

export default withAuth0(RecordTables);
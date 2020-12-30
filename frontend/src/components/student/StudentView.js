import React from "react";
import Background from "../background/Background";
import {Button, Card, CardContent, Grid} from "@material-ui/core";
import FRCTable from "../utility/Table";

const styles = {
    tables: {
        padding: "2%"
    }
}

class StudentView extends React.Component {
    tables = [<FRCTable title={"Your events"} secondaryTitle={"Date"} rows={[]}/>,
        <FRCTable title={"Upcoming events"} secondaryTitle={"Date"} rows={[]}/>,
        <FRCTable title={"Support hours"} secondaryTitle={"Week"} rows={[]}/>,
        <FRCTable title={"Operations hours"} secondaryTitle={"Week"} rows={[]}/>,
        <FRCTable title={"Votes"} secondaryTitle={"Date"} rows={[]}/>
    ];
    generateToolbarContent() {
        return (
            <Grid container spacing={4}>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Slack </Button>
                </Grid>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Records </Button>
                </Grid>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Events </Button>
                </Grid>
                <Grid item>
                    <Button size={"large"} variant={"contained"}> Voting </Button>
                </Grid>
            </Grid>
        );
    }

    generateContent() {
        return (
            <Grid container spacing={3} style={styles.tables}>
                {this.tables.map((row) => {
                    return (
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>{row}</CardContent>
                            </Card>

                        </Grid>
                    )
                })}
            </Grid>
        );
    }

    componentDidMount() {
        // Post, then
        // this.tables[0] = <FRCTable title={"Test"} rows={["a","b"]}/>;
        this.forceUpdate();
    }

    render() {
        return (
            <Background toolbarContent={this.generateToolbarContent()} content={this.generateContent()}/>
        );
    }
}

export default StudentView;
import React from "react";
import UberBackground from "./UberBackground";
import {Grid, Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import LambdaAPI from "../utility/LambdaAPI";
import {withAuth0} from "@auth0/auth0-react";

class UberView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: ["test"]
        }
    }

    componentDidMount() {
        LambdaAPI.GET("/request/getAll", this.props.auth0).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                this.setState({requests: response.requests});
            }
        });
    }

    generateTable() {
        return (
            <Table>
                <TableBody>
                    {this.state.requests.map((value) => {
                        return (
                            <TableRow key={value["uuid"]}>
                                <TableCell>
                                    {value["request_type"]}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        );
    }

    generateContent() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Active requests to approve </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {this.generateTable()}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}> Create </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }


    render() {
        return (
            <UberBackground content={this.generateContent()}/>
        )
    }
}

export default withAuth0(UberView);
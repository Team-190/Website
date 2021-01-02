import React from "react";
import LambdaAPI from "../utility/LambdaAPI";
import {Box, Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";

const styles = {
    heading: {
        fontWeight: "bold"
    }
}

class AllRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
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

    generateData(data, type) {
        let heading = <div/>
        if (type === "Hours") {
            heading = <Box fontWeight={"fontWeightBold"}>Hours: </Box>;
        } else if (type === "Meeting") {
            heading = <Box fontWeight={"fontWeightBold"}>Code word: </Box>;
        } else if (type === "Support") {
            heading = <Box fontWeight={"fontWeightBold"}>Description: </Box>;
        }
        return (
            <Grid container spacing={1}>
                <Grid item>
                    {heading}
                </Grid>
                <Grid item>
                    <Box> {data}</Box>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.heading} width={"10%"}> Type </TableCell>
                        <TableCell style={styles.heading} width={"20%"}> Name </TableCell>
                        <TableCell style={styles.heading} width={"10%"}> Date </TableCell>
                        <TableCell style={styles.heading} width={"60%"}> Data </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.requests.map((value) => {
                        return (
                            <TableRow key={value["uuid"]}>
                                <TableCell>{value["request_type"]}</TableCell>
                                <TableCell>{value["member_name"]}</TableCell>
                                <TableCell>{value["date"]}</TableCell>
                                <TableCell>{this.generateData(value["data"], value["request_type"])}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default withAuth0(AllRequests);
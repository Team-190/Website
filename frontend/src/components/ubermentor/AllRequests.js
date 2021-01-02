import React from "react";
import LambdaAPI from "../utility/LambdaAPI";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";

const styles = {
    heading: {
        width: "100%",
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

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.heading}> Type </TableCell>
                        <TableCell style={styles.heading}> Name </TableCell>
                        <TableCell style={styles.heading}> Date </TableCell>
                        <TableCell style={styles.heading}> Data </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.requests.map((value) => {
                        return (
                            <TableRow key={value["uuid"]}>
                                <TableCell>{value["request_type"]}</TableCell>
                                <TableCell>{value["member_name"]}</TableCell>
                                <TableCell>{value["date"]}</TableCell>
                                <TableCell>{value["data"]}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default withAuth0(AllRequests);
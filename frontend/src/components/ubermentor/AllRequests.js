import React from "react";
import LambdaAPI from "../utility/LambdaAPI";
import {Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
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
            requests: [],
            headerCells: [
                {name: "Type", width: "10%", id: "request_type"},
                {name: "Name", width: "20%", id: "member_name"},
                {name: "Date", width: "10%", id: "date"},
                {name: "Data", width: "60%", id: "data"}
            ],
            order: "asc",
            orderBy: "date"
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


    descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }


    createSortHandler = (property) => (event) => {
        console.log("handling");
        const {order, orderBy} = this.state;
        const isAsc = orderBy === property && order === 'asc';
        this.setState({order: isAsc ? 'desc' : 'asc', orderBy: property});
    };

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
        const {order, orderBy} = this.state;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {this.state.headerCells.map(value => {
                            const {width, name, id} = value;
                            const {order, orderBy} = this.state;
                            let label = id === "data" ? null : <TableSortLabel
                                active={orderBy === id}
                                direction={orderBy === id ? order : 'asc'}
                                onClick={this.createSortHandler(id)}
                            >
                                {name}
                            </TableSortLabel>;
                            return (
                                <TableCell width={width} style={styles.heading}
                                           sortDirection={orderBy === id ? order : false}>
                                    {label}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.stableSort(this.state.requests, this.getComparator(order, orderBy))
                            .map((value) => {
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
import React from "react";
import LambdaAPI from "../utility/LambdaAPI";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel
} from "@material-ui/core";

import {withAuth0} from "@auth0/auth0-react";
import {CheckCircleOutline, HighlightOffOutlined} from "@material-ui/icons";

const styles = {
    heading: {
        fontWeight: "bold"
    },
    confirm: {
        float: "right",
        paddingTop: "2%"
    }
}

class AllRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            headerCells: [
                {name: "Type", width: "10%", id: "request_type", ignore: false},
                {name: "Name", width: "20%", id: "member_name", ignore: false},
                {name: "Date", width: "10%", id: "date", ignore: false},
                {name: "Info", width: "50%", id: "data", ignore: true},
                {name: "Approve?", width: "10%", id: "buttons", ignore: true}
            ],
            order: "asc",
            orderBy: "date"
        }
        this.handleConfirm = this.handleConfirm.bind(this);
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

    handleConfirm() {
        const data = {
            requests: this.state.requests
        };
        LambdaAPI.POST("/request/confirm", this.props.auth0, data).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 200) {
                this.setState({requests: response.requests});
            }
        });
    }

    assignStatus(status, uuid) {
        let {requests} = this.state;
        for (let i = 0; i < requests.length; i++) {
            if (requests[i]["uuid"] === uuid) {
                let tempStatus = requests[i]["status"];
                if (tempStatus !== "pending") {
                    status = "pending";
                }
                requests[i]["status"] = status;
                this.setState({requests: requests});
                break;
            }
        }
    }

    generateTableHead() {
        const {headerCells} = this.state;
        return (
            headerCells.map(value => {
                const {width, name, id} = value;
                const {order, orderBy} = this.state;
                let label = value.ignore ? name : <TableSortLabel
                    active={orderBy === id}
                    direction={orderBy === id ? order : 'asc'}
                    onClick={this.createSortHandler(id)}
                >
                    {name}
                </TableSortLabel>;
                return (
                    <TableCell width={width} style={styles.heading} key={id}
                               sortDirection={orderBy === id ? order : false}>
                        {label}
                    </TableCell>
                );
            })
        );
    }

    generateTableBody() {
        const {order, orderBy, requests} = this.state;
        return (
            this.stableSort(requests, this.getComparator(order, orderBy))
                .map((value) => {
                    const checkStyle = value["status"] === "approved" ? {color: "green"} : {};
                    const xStyle = value["status"] === "denied" ? {color: "#a83236"} : {};
                    return (
                        <TableRow key={value["uuid"]}>
                            <TableCell>{value["request_type"]}</TableCell>
                            <TableCell>{value["member_name"]}</TableCell>
                            <TableCell>{value["date"]}</TableCell>
                            <TableCell>{this.generateData(value["data"], value["request_type"])}</TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <IconButton onClick={() => this.assignStatus("approved", value["uuid"])}>
                                            <CheckCircleOutline style={checkStyle}/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton onClick={() => this.assignStatus("denied", value["uuid"])}>
                                            <HighlightOffOutlined style={xStyle}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    );
                })
        );
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
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.generateTableHead()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.generateTableBody()}
                    </TableBody>
                </Table>
                <div style={styles.confirm}>
                    <Button variant={"contained"} color={"primary"} onClick={this.handleConfirm}> Confirm</Button>
                </div>
            </div>
        );
    }
}

export default withAuth0(AllRequests);
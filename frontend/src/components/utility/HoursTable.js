import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const styles = {
    heading: {
        fontWeight: "bold",
        width: "10%"
    }
}

class HoursTable extends React.Component {

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.heading}> Week </TableCell>
                        <TableCell style={styles.heading}> {this.props.title} </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.props.rows.map((row) => {
                            return (
                                <TableRow>
                                    <TableCell> {row.week} </TableCell>
                                    <TableCell> {row.value} </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    <TableRow>
                        <TableCell style={styles.heading}> Total </TableCell>
                        <TableCell
                            style={styles.heading}> {this.props.rows.reduce((rowA, rowB) => rowA.value + rowB.value, 0)} </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        )
    }
}

export default HoursTable;
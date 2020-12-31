import React from "react";
import {Table, TableCell, TableHead, TableRow} from "@material-ui/core";

const styles = {
    heading: {
        fontWeight: "bold",
        width:"33%",
    },
    cell: {
        width:"33%"
    }
}

class EventTable extends React.Component {

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.heading}> {this.props.title} </TableCell>
                        <TableCell style={styles.heading}> Type </TableCell>
                        <TableCell style={styles.heading}> Date </TableCell>
                    </TableRow>
                </TableHead>
                {
                    this.props.rows.map((row) => {
                        return (
                            <TableRow>
                                <TableCell style={styles.cell}> {row.value} </TableCell>
                                <TableCell style={styles.cell}> {row.event_type} </TableCell>
                                <TableCell style={styles.cell}> {row.date} </TableCell>
                            </TableRow>
                        );
                    })
                }
            </Table>

        )
    }
}

export default EventTable;
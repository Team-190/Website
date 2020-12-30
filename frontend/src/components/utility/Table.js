import React from "react";
import {Table, TableCell, TableHead, TableRow} from "@material-ui/core";

const styles = {
    heading: {
        fontWeight: "bold",
        width:"10%"
    }
}

class FRCTable extends React.Component {

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.heading}> {this.props.title} </TableCell>
                        <TableCell style={styles.heading}> {this.props.secondaryTitle} </TableCell>
                    </TableRow>
                </TableHead>
                {
                    this.props.rows.map((row) => {
                        return (
                            <TableRow>
                                <TableCell> {row.value} </TableCell>
                                <TableCell> {row.date} </TableCell>
                            </TableRow>
                        );
                    })
                }
            </Table>

        )
    }
}

export default FRCTable;
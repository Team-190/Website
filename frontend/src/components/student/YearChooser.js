import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const styles = {
    formControl: {
        width: "100%"
    }
}

class YearChooser extends React.Component {
    date = new Date();
    constructor(props) {
        super(props);
        this.state={
            year:this.date.getFullYear()
        }
    }

    handleChange(event) {
        this.setState({year: event.target.value});
    }

    generateYears() {
        //todo real years
        return [2021].map((value) => {
            return (
                <MenuItem value={value} key={value}>{value}</MenuItem>
            );
        });
    }

    render() {
        return (
            <FormControl style={styles.formControl}>
                <InputLabel id={"studentYearLabel"}> Year </InputLabel>
                <Select required labelId={"studentYearLabel"}
                        id={"studentYear"} onChange={this.handleChange}
                        value={this.state.year}>
                    {this.generateYears()}
                </Select>
            </FormControl>
        )
    }
}

export default YearChooser;
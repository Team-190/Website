import React, {Component} from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const styles = {
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    content: {
        marginTop: 80
    },
    teamName: {
        float: "left",
        display: "flex"
    },
    toolbarContent: {
        float: "right"
    }
}

class Background extends Component {
    render() {
        return (
            <div className={"BackgroundContainer"}>
                <AppBar id={"AppBar"}>
                    <Toolbar id={"Toolbar"} style={styles.toolbar}>
                        <div style={styles.teamName}>
                            <Typography variant={"h5"}> Team 190 </Typography>
                        </div>
                        <div style={styles.toolbarContent}>
                            {this.props.toolbarContent}
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={styles.content}>
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default Background;
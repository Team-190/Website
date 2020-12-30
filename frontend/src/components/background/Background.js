import React, {Component} from "react";
import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";

const styles = {
    content: {
        marginTop: 80
    }
}

class Background extends Component {
    render() {
        return (
            <div className={"BackgroundContainer"}>
                <AppBar id={"AppBar"}>
                    <Toolbar id={"Toolbar"}>
                        <Grid container direction={"row"}>
                            <Grid item xs={2}>
                                <Typography variant={"h5"}> Team 190 </Typography>
                            </Grid>
                            {this.props.toolbarContent}
                        </Grid>
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
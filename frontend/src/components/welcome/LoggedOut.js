import React from "react";
import Background from "../utility/Background";
import {Button, Grid, Typography} from "@material-ui/core";
import {withAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

class LoggedOut extends React.Component {
    render() {
        return (
            <Background toolbarContent={null} content={
                <Grid container justify={"center"} spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={"h3"}>
                            Your log in session has expired. Please log in again.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to={"/"}>
                            <Button variant={"contained"} color={"primary"}> Return to home page</Button>
                        </Link>
                    </Grid>
                </Grid>
            }
            />
        )
    }
}

export default withAuth0(LoggedOut);
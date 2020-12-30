import React from "react";
import {Button, Card, CardMedia, Grid, Typography} from "@material-ui/core";
import Background from "../background/Background";
import team from "../../resources/images/2k19.png";

const styles = {
    mainImage: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}
A
class Welcome extends React.Component {
    componentDidMount() {
        // const api_url = "https://nwnofhzw04.execute-api.us-east-1.amazonaws.com/production/hello";
        // let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        // xmlhttp.open("POST", api_url, true);
        // xmlhttp.responseType = "json";
        // xmlhttp.onloadend = () => {
        //     console.log("Response: " + JSON.stringify(xmlhttp.response));
        //     if (xmlhttp.response.statusCode === 200) {
        //         document.getElementById("test").innerText = JSON.parse(xmlhttp.response.body)["message"];
        //     }
        // }
        // xmlhttp.send(JSON.stringify({name: "grant"}));
    }

    generateToolbarContent() {
        return (
            <div>
                <Grid item>
                    <Button variant={"contained"}> Log in</Button>
                </Grid>
            </div>
        );
    }

    generateContent() {
        return (
            <div>
                <Typography variant={"h1"} id={"test"}> Test </Typography>
                <Card>
                    <CardMedia style={styles.mainImage}
                               image={team}
                               title={"2019 Team"}/>
                </Card>
            </div>
        );
    }

    render() {
        return (
            <Background
                toolbarContent={
                    this.generateToolbarContent()
                }
                content={this.generateContent()}/>
        );
    }
}


export default Welcome;
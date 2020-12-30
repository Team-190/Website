import React from "react";
import {Typography} from "@material-ui/core";

class Welcome extends React.Component {
    componentDidMount() {
        const api_url = "https://nwnofhzw04.execute-api.us-east-1.amazonaws.com/production/hello";
        let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", api_url, true);
        xmlhttp.responseType = "json";
        xmlhttp.onloadend = () => {
            console.log("Response: " + JSON.stringify(xmlhttp.response));
            if (xmlhttp.response.statusCode === 200) {
                document.getElementById("test").innerText = JSON.parse(xmlhttp.response.body)["message"];
            }
        }
        xmlhttp.send(JSON.stringify({name: "grant"}));
    }

    render() {
        return (
            <Typography variant={"h1"} id={"test"}> Test </Typography>
        );
    }
}

export default Welcome;
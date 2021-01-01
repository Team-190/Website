class LambdaAPI {
    static api_url_base = "https://c22onf2w15.execute-api.us-east-1.amazonaws.com/production/";

    static request(method, route, auth0, data = null) {
        let {getAccessTokenSilently} = auth0;
        getAccessTokenSilently({audience: "team190", scopes: "openid profile email"}).then((token) => {
            let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            xmlhttp.open(method, LambdaAPI.api_url_base + route, true);
            xmlhttp.responseType = "json";
            xmlhttp.onloadend = () => {
                console.log("Status: "+ xmlhttp.status+", Response: " + JSON.stringify(xmlhttp.response));
                return {
                    status: xmlhttp.status,
                    response: xmlhttp.response
                }
            }
            xmlhttp.setRequestHeader("Authorization", `Bearer ${token}`);
            if (method === "POST") {
                xmlhttp.send(JSON.stringify(data));
            } else {
                xmlhttp.send();
            }
        });
    }
}

export default LambdaAPI;
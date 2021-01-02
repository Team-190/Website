class LambdaAPI {
    static request(method, route, auth0, data = null) {
        const api_url_base = "https://c22onf2w15.execute-api.us-east-1.amazonaws.com/production";
        let {getAccessTokenSilently} = auth0;
        return getAccessTokenSilently({audience: "team190", scopes: "openid profile email"}).then((token) => {
            let headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            let request = new Request(api_url_base + route, {
                method: method,
                headers: headers,
                body: method === "POST" ? JSON.stringify(data) : null
            });
            return fetch(request).then(response => {
                return response.json().then(json => {
                    return {
                        status: response.status,
                        response: json
                    }
                });
            });
        });
    }

    static GET(route, auth0) {
        return LambdaAPI.request("GET", route, auth0);
    }

    static POST(route, auth0, data) {
        return LambdaAPI.request("POST", route, auth0, data);
    }

    static RETURN_ROLE(auth0, callback) {
        this.GET("/login", auth0).then(tuple => {
            const response = tuple.response;
            const status = tuple.status;
            if (status === 201) {
                // Must choose role
                return callback("undefined");
            } else if (status === 200) {
                // Redirect to role-respective page
                return callback(response["message"]);
            } else {
                console.log(`An unexpected code was encountered. ${status}`)
            }
        })
    }
}

export default LambdaAPI;
class LambdaAPI {
    static api_url_base = "https://c22onf2w15.execute-api.us-east-1.amazonaws.com/production/";

    static request(method, route, auth0, data = null) {
        let {getAccessTokenSilently} = auth0;
        return getAccessTokenSilently({audience: "team190", scopes: "openid profile email"}).then((token) => {
            let headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            let request = new Request(LambdaAPI.api_url_base + route, {method: method, headers: headers, body: method === "POST" ? JSON.stringify(data) : null});
            return fetch(request).then(response => {
                return {
                    status: response.status,
                    response: response.json()
                }
            });
        });
    }
}

export default LambdaAPI;
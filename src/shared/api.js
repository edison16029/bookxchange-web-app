const axios = require('axios');

class API {
    constructor() {
        this.url = "http://localhost:3000/api/v1";
        this.endpoints = {};
        this.createUserEndpoint();
    }

    createUserEndpoint = () => {
        this.endpoints['users'] = {
            login : (requestBody) => {
                var endpointUrl = this.url + "/users/login";
                return (
                    //adding semicolon will throw error as it ends the statement without the promise returned.
                    axios.post(endpointUrl, requestBody)
                )
            },
            verifyLogin : (requestBody) => {
                var endpointUrl = this.url + "/users/login/verify";
                return (
                    axios.post(endpointUrl, requestBody)
                )
                
            }
        }
    }
}

export default API;
const axios = require('axios');

axios.defaults.withCredentials = true

class API {
    constructor() {
        this.url = "http://localhost:3000/api/v1";
        this.endpoints = {};
        this.createUserEndpoint();
    }

    createUserEndpoint = () => {
        this.endpoints['users'] = {
            signup: (requestBody) => {
                var endpointUrl = this.url + "/users/signup";
                return (
                    //adding semicolon will throw error as it ends the statement without the promise returned.
                    axios.post(endpointUrl, requestBody)
                )
            },
            verifySignup: (requestBody) => {
                var endpointUrl = this.url + "/users/signup/verify";
                return (
                    axios.post(endpointUrl, requestBody)
                )
            },
            login: (requestBody) => {
                var endpointUrl = this.url + "/users/login";
                return (
                    axios.post(endpointUrl, requestBody)
                )
            },
            verifyLogin: (requestBody) => {
                var endpointUrl = this.url + "/users/login/verify";
                return (
                    axios.post(endpointUrl, requestBody)
                )
            },
            readNotifications: (requestBody) => {
                var endpointUrl = this.url + "/users/notifications";
                return (
                    axios.post(endpointUrl, requestBody)
                )
            },
            fetchMyUser: () => {
                var endpointUrl = this.url + "/users/me";
                return (
                    axios.get(endpointUrl, {})
                )
            }
        };
        this.endpoints['books'] = {
            fetchNearbyBooks: () => {
                var endpointUrl = this.url + "/books/find";
                return (
                    axios.get(endpointUrl, {})
                )
            },
            likeBook: (id) => {
                var endpointUrl = this.url + "/books/" + id + "/like";
                return (
                    axios.put(endpointUrl, {})
                )
            },
            fetchBooksILiked: () => {
                var endpointUrl = this.url + "/books/liked";
                return (
                    axios.get(endpointUrl, {})
                )
            },
            fetchBooksOthersLiked: () => {
                var endpointUrl = this.url + "/books/othersLiked";
                return (
                    axios.get(endpointUrl, {})
                )
            }
        }
    }
}

export default API;

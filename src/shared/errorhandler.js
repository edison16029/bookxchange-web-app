import notifyUser from './Notification';

const handleError = (error) => {
    if( error.response){ // client received an error response (5xx, 4xx)
        notifyUser("error", "Error", error.response.data.message)
    }
    else if( error.request) { // client never received a response, or request never left
        notifyUser("error", "Error", "Bad Network/Server Failure. Try again later.")
    }
    else{ // other cases
        notifyUser("error", "Error", "Unexpected Error Occured. Try again later.")
    }
}
export default handleError;
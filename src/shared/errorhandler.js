const handleError = (error) => {
    if( error.response){ // client received an error response (5xx, 4xx)
        alert("Error : " + error.response.data.message);
        console.log("Error : ",error.response.data);
    }
    else if( error.request) { // client never received a response, or request never left
        alert("Error : " + "Bad Network/Server Failure. Try again later");
        console.log("Error : ",error.request);
    }
    else{ // other cases
        alert("Unexpected Error Occured. Try again later");
        console.log("Unexpected Error");
    }
}
export default handleError;
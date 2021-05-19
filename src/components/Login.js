import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import '../styles/login.scss';
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';
import notifyUser from '../shared/Notification';
import constants from '../shared/constants';
import { fetchMyAccountData, fetchBooksIOwn } from "../redux/profileSlice";
import { fetchBooks } from '../redux/booksSlice';
import { fetchBooksILiked, fetchBooksOthersLiked } from "../redux/matchedBooksSlice";

const Login = (props) => {

    /* TODO : Automatically Redirect Logged in User
    if(<condition></condition>){
        return (
            <Redirect to = "/browsebooks" />
        )
    }
    */

    const {
        fetchMyAccountData,
        fetchBooksIOwn,
        fetchBooks,
        fetchBooksILiked,
        fetchBooksOthersLiked
    } = props;

    const SigninStage = {
        SendOTP : 0,
        VerifyOTP : 1
    }
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [signinStage, setSigninStage] = useState(SigninStage.SendOTP);
 
    const validateForm = () => email.length > 0;

    const getButtonText = () => signinStage === SigninStage.SendOTP ? "Send OTP" : "Verify OTP";
        
    const sendOTP = () => {
        const requestBody = { 
            "email" : email
        }
        const myApi = new API();
        myApi.endpoints.users.login(requestBody)
            .then(response => {
                notifyUser("success", "OTP Sent", "OTP has been sent to your Email Id successfully.");
                setSigninStage(SigninStage.VerifyOTP);
            })
            .catch(error => {
                handleApiError(error);                
            });  
    }

    const verifyOTP = () => {
        const requestBody = { 
            "email" : email,
            "otp" : otp
        }
        const myApi = new API();
        myApi.endpoints.users.verifyLogin(requestBody)
            .then(response => {
                if(response.status === 200){
                    //Fetching all the required data at login
                    fetchMyAccountData();
                    fetchBooksIOwn();
                    fetchBooks();
                    fetchBooksILiked();
                    fetchBooksOthersLiked();
                    props.history.push(constants.routes.home);
                }
                else{
                    notifyUser("error", "Error", "Error Occured while signing in. Try again."); //ideally, this should be unreachable.
                }
            })
            .catch(error => {
                handleApiError(error);                
            });  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(signinStage === SigninStage.SendOTP){
            sendOTP();
        }
        else if(signinStage === SigninStage.VerifyOTP){
            verifyOTP();
        }
        else{
            notifyUser("error", "Error", "Invalid Submission."); //ideally, this should be unreachable.
        }
        
    }

    return (
        <div className="login-root-container">
            <div className = "logo-container">
                BookXChange
            </div>
            <div className="Login">
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="otp">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                disabled = {signinStage === SigninStage.SendOTP}
                                type="password"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                            />
                        </Form.Group>
                        <div className = "signup-message-container">
                            <p>New to BookXChange?&nbsp;</p>
                            <a href={constants.routes.signup}> Join Now</a>
                        </div>
                        
                        <div className="button-container">
                            <Button block size="lg" type="submit" disabled={!validateForm()} className="login-button">
                                {getButtonText()}
                            </Button>
                        </div>
                    </Form>
                </Container>
                
            </div>
        </div>
        
        

    );
}

export default connect(null, {
        fetchMyAccountData,
        fetchBooksIOwn,
        fetchBooks,
        fetchBooksILiked,
        fetchBooksOthersLiked
    })(Login);

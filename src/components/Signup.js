import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import '../styles/signup.scss';
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';
const Signup = (props) => {

    const SigninStage = {
        SendOTP : 0,
        VerifyOTP : 1
    }
    const TAG = "[Signup.js] ";
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signinStage, setSigninStage] = useState(SigninStage.SendOTP);
 
    const validateForm = () => email.length > 0 && username.length > 0;

    const getButtonText = () => signinStage === SigninStage.SendOTP ? "Send OTP" : "Verify OTP";
        
    const sendOTP = () => {
        const requestBody = {
            "name" : username, 
            "email" : email
        }
        console.log(TAG,"Sending Request to generate OTP");
        const myApi = new API();
        myApi.endpoints.users.signup(requestBody)
            .then(response => {
                alert("OTP has been sent to your Email Id successfully.");
                console.log(TAG,"Response for sendOTP : ",response.data);
                setSigninStage(SigninStage.VerifyOTP);
            })
            .catch(error => {
                handleApiError(error);                
            });  
    }

    const verifyOTP = () => {
        const requestBody = { 
            "email" : email,
            "otp" : password
        }
        console.log(TAG,"Sending Request to verify OTP");
        const myApi = new API();
        myApi.endpoints.users.verifySignup(requestBody)
            .then(response => {
                console.log(TAG,"Response for verifyOTP : ",response);
                if(response.status === 200){
                    console.log("Signup Successful. Redirecting to Home Page");
                    props.history.push("/browsebooks");
                }
                else{
                    alert("Error Occured while signing in. Try again."); //ideally, this should be unreachable.
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
            alert("Invalid Submission"); //ideally, this should be unreachable.
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
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={username}
                                onChange={(e) => setUserame(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password" >
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                disabled = {signinStage === SigninStage.SendOTP} 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className = "signin-message-container">
                            <p>Already a member?&nbsp;</p>
                            <a href="/signin"> Sign In</a>
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

export default Signup;
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import '../styles/login.scss';
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';
import { withRouter } from "react-router-dom";
const Login = (props) => {

    /* TODO : Automatically Redirect Logged in User
    if(<condition></condition>){
        return (
            <Redirect to = "/browsebooks" />
        )
    }
    */

    /* TODO : Disable OTP field until OTP is sent */
   console.log("Props for Login ", props);
    const SigninStage = {
        SendOTP : 0,
        VerifyOTP : 1
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signinStage, setSigninStage] = useState(SigninStage.SendOTP);
 
    const validateForm = () => email.length > 0;

    const getButtonText = () => signinStage == SigninStage.SendOTP ? "Send OTP" : "Verify OTP";
        
    const sendOTP = () => {
        const requestBody = { 
            "email" : email
        }
        console.log("Sending Request to generate OTP");
        const myApi = new API();
        myApi.endpoints.users.login(requestBody)
            .then(response => {
                alert("OTP has been sent to your Email Id successfully.");
                console.log("Response for sendOTP : ",response.data);
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
        console.log("Sending Request to verify OTP");
        const myApi = new API();
        myApi.endpoints.users.verifyLogin(requestBody)
            .then(response => {
                console.log("Response for verifyOTP : ",response);
                if(response.status === 200){
                    console.log("Login Successful. Redirecting to Home Page");
                    // alert("Login Successful"); //TODO : Replace this with code to Redirect to home page       
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
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
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

export default Login;
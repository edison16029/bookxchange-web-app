import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import '../styles/login.scss';
const Login = () => {

    /* TODO : Automatically Redirect Logged in User
    if(<condition></condition>){
        return (
            <Redirect to = "/browsebooks" />
        )
    }
    */

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("Send OTP");
 
    function validateForm() {
        return email.length > 0;
    }
 
    function handleSubmit(event) {
        event.preventDefault();
        alert("The OTP has been sent your email.");
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
                                {buttonText}
                            </Button>
                        </div>
                        
                    </Form>
                </Container>
                
            </div>
        </div>
        
        

    );
}

export default Login;
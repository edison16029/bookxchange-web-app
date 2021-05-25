import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { appColours } from '../../shared/styles';
import '../../styles/navigationbar.scss';
import {Button} from "antd"
import API from '../../shared/api';
import handleApiError from '../../shared/errorhandler';
import notifyUser from '../../shared/Notification';
import { LogoutOutlined} from '@ant-design/icons';
import constants from '../../shared/constants';
const NavigationBarComponent = (props) => {

    const { location } = props;
    
    const navbarItemStyle = {
        color : appColours.white,
        paddingRight : 30,
        paddingLeft : 30,
    }

    const navbarActiveItemStyle = {
        color : appColours.black,
        backgroundColor : appColours.secondary,
        paddingRight : 30,
        paddingLeft : 30,
    }

    if(props.history.location.pathname === constants.routes.signin || props.history.location.pathname === constants.routes.signup){
        return (
            <div></div>
        )
    }
    const handleLogout =()=>{
        const myApi = new API();
        myApi.endpoints.users.logout()
        .then(response => {
            notifyUser("success", "Logged Out", "You have been logged out successfully.");
            props.history.push('/')
        })
        .catch(error => {
            handleApiError(error);  
        });
        
    }
    return (
        <div className = "navbar-container">
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand href={constants.routes.home}> <div className="white-font">BookXchange</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav activeKey = {location.pathname} >
                        <Nav.Link eventKey={1} as={NavLink} exact to={constants.routes.browseBooks} style = {navbarItemStyle} activeStyle={navbarActiveItemStyle}>
                            Browse Books
                        </Nav.Link>
                        <Nav.Link eventKey={2} as={NavLink} exact to={constants.routes.profile} style = {navbarItemStyle} activeStyle={navbarActiveItemStyle}>
                            Profile
                        </Nav.Link>                    
                        <Nav.Link eventKey={3} as={NavLink} exact to={constants.routes.matchedBooks} style = {navbarItemStyle} activeStyle={navbarActiveItemStyle}>
                            Matched Books
                        </Nav.Link>
                    </Nav>
                    <Button onClick={handleLogout} icon={<LogoutOutlined />} />
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export const NavigationBar = withRouter(NavigationBarComponent);
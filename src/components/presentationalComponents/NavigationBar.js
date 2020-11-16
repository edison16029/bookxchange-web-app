import React from 'react'
import { Nav, Navbar} from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { appColours } from '../../shared/styles';

const NavigationBarComponent = (props) => {

    const { location } = props;

    const navbarStyle = {
        backgroundColor : appColours.lighter_primary,
    }

    const brandItemStyle = {
        color : appColours.white,
    }

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

    return (
        <Navbar collapseOnSelect expand="lg" style={navbarStyle}>
            <Navbar.Brand href="/profile" style = {brandItemStyle} >BookXchange</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav activeKey = {location.pathname} >
                    <Nav.Link eventKey={1} as={NavLink} exact to="/profile" style = {navbarItemStyle} activeStyle={navbarActiveItemStyle}>
                        Profile
                    </Nav.Link>
                    <Nav.Link eventKey={2} as={NavLink} exact to="/browsebooks" style = {navbarItemStyle} activeStyle={navbarActiveItemStyle}>
                        Browse Books
                    </Nav.Link>
                    <Nav.Link eventKey={3} as={NavLink} exact to="/matchedbooks" style = {navbarItemStyle} activeStyle={navbarActiveItemStyle}>
                        Matched Books
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavigationBar = withRouter(NavigationBarComponent);
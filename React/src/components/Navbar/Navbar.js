import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import './Navbar.css'
import SearchBar from '../SearchBar/SearchBar'
import TokenService from '../../services/token-service'
import { useHistory } from "react-router-dom";

const NavigationBar = (props) => {


    const [user, setUser] = useState([])

    let history = useHistory();


    //logout
    const logout = () => {
        TokenService.clearAuthToken();
        history.push('/');

        props.setLoggedIn(false);

    }

    useEffect(() => {
        //if user is logged in

        if (TokenService.hasAuthToken()) {
            setUser(TokenService.getUser())
            props.setLoggedIn(true);
            console.log(user)
        } else {
            props.setLoggedIn(false)
        }
    }, [])


    if (props.loggedIn && user) {
        return (
            <section className="navbar=wrapper">
                <Navbar fixed="top" expand="lg" className="navbar">
                    <Navbar.Brand href="/user/home">Embers</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {console.log(user)}
                            <Nav.Link href="/user/home">Home</Nav.Link>
                            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>

                            <Nav.Link to="/user/home">{user.firstName}</Nav.Link>
                        </Nav>
                        <SearchBar />
                    </Navbar.Collapse>
                </Navbar>
            </section>
        )
    }

    //if user isn't logged in
    else {
        return (
            <section className="navbar=wrapper">
                <Navbar expand="lg" className="navbar">
                    <Navbar.Brand href="#home">Embers</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                        <SearchBar />
                    </Navbar.Collapse>
                </Navbar>
            </section>
        )
    }

}


export default NavigationBar;

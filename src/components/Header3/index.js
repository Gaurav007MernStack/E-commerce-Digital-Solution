import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import {NavLink, Link, useHistory} from 'react-router-dom';
import logo from '../../Images/E-cart.PNG';

/**
* @author
* @function Header2
**/

const Header3 = (props) => {
    const history = useHistory();
    const logout = ()=> {
        localStorage.setItem('isLoggedIn', false);
        history.push('/signin');
    };
    return (
        <Navbar collapseOnSelect expand="lg"  variant="dark" className="navclr sticky-top">
            <Container>
                {/*<Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>*/}
                <Link to='/admin/home' className="navbar-brand">E-DigiTal_CART</Link>
                <img src={logo} style={{width: "100px", height: "100px", borderTopLeftRadius: "100px"}} alt="Web Logo" />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>*/}    
                    </Nav>
                    <Nav>
                        {/*<Nav.Link href="#deets">Signin</Nav.Link>*/}
                        <li className="nav-item">
                            <NavLink to="getAllOrders" className="nav-link">All Current Orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="getAllProducts" className="nav-link">All Products</NavLink>
                        </li>
                        <li className="nav-item">
                        <Button className="btn" onClick={() => logout()}>Logout</Button>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )

}

export default Header3;
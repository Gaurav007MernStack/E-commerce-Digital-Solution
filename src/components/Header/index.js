import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../Images/E-cart.PNG';

/**
* @author
* @function Header
**/

const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg"  variant="dark" className="navclr">
            <Container>
                {/*<Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>*/}
                <Link to='/' className="navbar-brand">E-DigiTal_CART</Link>
                <img src={logo} style={{width: "100px", height: "100px", borderTopLeftRadius: "100px"}} alt="Web Logo" />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {/*<Nav.Link href="#deets">Signin</Nav.Link>*/}
                        <li className="nav-item" style={{marginLeft: "750px"}}>
                            <NavLink to="signin" className="nav-link">Signin</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="signup" className="nav-link">Signup</NavLink>
                        </li>
                        {/*<li className="nav-item">
                            <NavLink to="admin/getAllOrders" className="nav-link">All Orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="admin/getAllProducts" className="nav-link">All Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="myWishlist" className="nav-link">Wishlist</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="myOrders" className="nav-link">My Orders</NavLink>
                        </li>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )

}

export default Header
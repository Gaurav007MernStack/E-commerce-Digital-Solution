import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../Images/E-cart.PNG';

/**
* @author
* @function Footer
**/

const Footer = (props) => {
    return (
        <div className="container-fluid p-0" id="contact us">
        <div className="footer text-white">
            <table>
              <thead>
                <tr>
                  <td className="btn-outline-light"><b><i><a href="#Devices">Devices / SmartPhones</a></i></b></td>
                  <td className="btn-outline-light"><b><i><a href="#Fashion">Fashion</a></i></b></td>
                  <td className="btn-outline-light"><b><i><a href="#Home">Home Furnishing</a></i></b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="btn-outline-secondary text-dark">OnePlus</td>
                  <td className="btn-outline-secondary text-dark">Jackets & Sweatshirts</td>
                  <td className="btn-outline-secondary text-dark">Bedsheets</td>
                </tr>
                <tr>
                  <td className="btn-outline-secondary text-dark">Samsung</td>
                  <td className="btn-outline-secondary text-dark">Women's Top T-shirts</td>
                  <td className="btn-outline-secondary text-dark">Cushion Cover</td>
                </tr>
                <tr>
                  <td className="btn-outline-secondary text-dark">Redmi</td>
                  <td className="btn-outline-secondary text-dark">Men's T-shirts & Polds</td>
                  <td className="btn-outline-secondary text-dark">Pillows</td>
                </tr>
                <tr>
                  <td className="btn-outline-secondary text-dark">Iphone</td>
                  <td className="btn-outline-secondary text-dark">Flip-Flop Sandals</td>
                  <td className="btn-outline-secondary text-dark">Curtains</td>
                </tr>
                <tr>
                  <td className="btn-outline-secondary text-dark">Oppo</td>
                  <td className="btn-outline-secondary text-dark">Casual Shoes</td>
                  <td className="btn-outline-secondary text-dark">Best Sellers</td>
                </tr>
              </tbody>
            </table>
            <div className="para text-white bg-secondary p-4">
              <p className="text-white">copyright © all rights reserved to The E-Digital_Cart<b className="adminHead">({'G & N'})</b> 2021..</p>
            </div>
          </div>
    </div>
    )

}

export default Footer;
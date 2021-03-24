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
        <div class="container-fluid p-0" id="contact us">
        <div class="footer text-white">
            <table>
              <thead>
                <tr>
                  <td class="btn-outline-light"><b><i>Devices / SmartPhones</i></b></td>
                  <td class="btn-outline-light"><b><i>Fashion</i></b></td>
                  <td class="btn-outline-light"><b><i>Home Furnishing</i></b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="btn-outline-secondary text-dark">OnePlus</td>
                  <td class="btn-outline-secondary text-dark">Jackets & Sweatshirts</td>
                  <td class="btn-outline-secondary text-dark">Bedsheets</td>
                </tr>
                <tr>
                  <td class="btn-outline-secondary text-dark">Samsung</td>
                  <td class="btn-outline-secondary text-dark">Women's Top T-shirts</td>
                  <td class="btn-outline-secondary text-dark">Cushion Cover</td>
                </tr>
                <tr>
                  <td class="btn-outline-secondary text-dark">Redmi</td>
                  <td class="btn-outline-secondary text-dark">Men's T-shirts & Polds</td>
                  <td class="btn-outline-secondary text-dark">Pillows</td>
                </tr>
                <tr>
                  <td class="btn-outline-secondary text-dark">Iphone</td>
                  <td class="btn-outline-secondary text-dark">Flip-Flop Sandals</td>
                  <td class="btn-outline-secondary text-dark">Curtains</td>
                </tr>
                <tr>
                  <td class="btn-outline-secondary text-dark">Oppo</td>
                  <td class="btn-outline-secondary text-dark">Casual Shoes</td>
                  <td class="btn-outline-secondary text-dark">Best Sellers</td>
                </tr>
              </tbody>
            </table>
            <div class="para text-white bg-secondary p-4">
              <p class="text-white">copyright © all rights to reserved The E-Digital_Cart<b className="adminHead">({'G & N'})</b> 2021..</p>
            </div>
          </div>
    </div>
    )

}

export default Footer;
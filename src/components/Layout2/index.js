import React from 'react';
import Header2 from '../Header2';
import Footer from '../Footer';



const Layout2 = (props) => {
  return(
    <>
        <Header2/>
          {props.children}
        <Footer/>
    </>
   )

 }

export default Layout2;
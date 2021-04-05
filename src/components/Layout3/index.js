import React from 'react';
import Header3 from '../Header3';
import Footer from '../Footer';



const Layout3 = (props) => {
  return(
    <>
        <Header3/>
          {props.children}
        <Footer/>
    </>
   )

 }

export default Layout3;
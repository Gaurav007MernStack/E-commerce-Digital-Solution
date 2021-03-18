import React from 'react'
import Header2 from '../Header2'



const Layout2 = (props) => {
  return(
    <>
        <Header2/>
          {props.children}
    </>
   )

 }

export default Layout2;
import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
//import Input from '../../components/UI/Input';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
  const [signin,setsignin] = useState({
    email: "",
    password: "",
  });
  const handleDataChange=(e)=>{
    const {name, value} = e.target
    setsignin({...signin,[name]:value})
};
const OnFormSubmit = (e)=>{
  e.preventDefault();
  console.log(signin);
  setsignin({
    email: "",
    password: "",
  })
};
  return (
    <Layout>
      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={(e)=>OnFormSubmit(e)} >
            <label>Email</label>
            <input 
                placeholder="Email"
                name="email"
                value={signin.email}
                type="email"
                onChange={(e)=>handleDataChange(e)}
            />
            <label>Password</label>
            <input 
                label="Password"
                placeholder="Password"
                name="password"
                value={signin.password}
                type="password"
                onChange={(e)=>handleDataChange(e)}
            />
              <Button variant="primary" type="submit" id="signin">
                Signin
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>
  )
 
}

export default Signin;
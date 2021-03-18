import React, {useState} from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
//import Input from '../../components/UI/Input';

/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const [signup,setsignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleDataChange=(e)=>{
    const {name, value} = e.target
    setsignup({...signup,[name]:value})
};
const OnFormSubmit = (e)=>{
  e.preventDefault();
  console.log(signup);
  setsignup({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
};
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={(e)=>OnFormSubmit(e)} >
              <Row>
                <Col md={6}>
                  <label>First Name</label>
                  <input 
                    id="fname"
                    placeholder="First Name"
                    value={signup.firstName}
                    name="firstName"
                    type="text"
                    onChange={(e)=>handleDataChange(e)}
                  />
                </Col>
                <Col md={6}>
                  <label>Last Name</label>
                <input 
                    id="lname"
                    placeholder="Last Name"
                    value={signup.lastName}
                    name="lastName"
                    type="text"
                    onChange={(e)=>handleDataChange(e)}
                  />
                </Col>
              </Row>

              <Form.Group>
                <label>Email</label>
              <input 
                //label="Email"
                placeholder="Email"
                value={signup.email}
                name="email"
                type="email"
                onChange={(e)=>handleDataChange(e)}
              />
              </Form.Group>
              <label>Password</label>
              <input 
                //label="Password"
                placeholder="Password"
                value={signup.password}
                name="password"
                type="password"
                onChange={(e)=>handleDataChange(e)}
              />
              <Button variant="primary" type="submit" id="signup">
                Signup
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>
  )

}

export default Signup;
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
//import Input from '../../components/UI/Input';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
  const [loader, setloader] = useState(false);
  const [signin, setsignin] = useState({
    email: "",
    password: "",
  });
  const handleDataChange = (e) => {
    const { name, value } = e.target
    setsignin({ ...signin, [name]: value })
  };
  const OnFormSubmit = (e) => {
    e.preventDefault();
    usersignin();
    setsignin({
      email: "",
      password: "",
    })
    
  };
  const usersignin = async () => {
    setloader(true);
    try {
      const res = await axios.post(`http://localhost:2000/signin`, signin);
      console.log(res)
      if(res.error){
        setloader(false);
        toast.error("Signin Failed")
      }else{
        setloader(false);
        toast.success("Signin Successful")
      }
      
      setsignin({
        email: "",
        password: "",
      })
    } catch (error) {
      console.log("error", error);
      toast.error("Signin Failed")
      setloader(false);
    }
  };
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={(e) => OnFormSubmit(e)} >
              <label>Email</label>
              <input
                placeholder="Email"
                name="email"
                value={signin.email}
                type="email"
                onChange={(e) => handleDataChange(e)}
              />
              <label>Password</label>
              <input
                label="Password"
                placeholder="Password"
                name="password"
                value={signin.password}
                type="password"
                onChange={(e) => handleDataChange(e)}
              />
              {
                loader ? (
                  <Button variant="primary" type="submit" id="signin" >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />Loading...
                  </Button>
                ) : ("")
              }
              {
                loader ? ("") : (<Button variant="primary" type="submit" id="signin">
                Signin
              </Button>)
              }
              
            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>
  )

}

export default Signin;
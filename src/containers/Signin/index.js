import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';
//import Input from '../../components/UI/Input';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
  //const handleOnClick = () => history.push('/user/home');
  const history = useHistory();
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
      const res = await axios.post(`https://e-commerce-serve-r.herokuapp.com/signin`, signin);
      {/*console.log(res)*/}
      const token_u = res.data.token;
      const user_u = res.data.user;
      let t = JSON.stringify(token_u)
      let u = JSON.stringify(user_u)
      localStorage.setItem('token', t);
      localStorage.setItem('user', u);
      localStorage.setItem('isLoggedIn', true);
      setloader(false);
      toast.success("Signin Successful")
      history.push('/user/home');
      
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
                  <Button variant="primary" type="submit" id="signin">
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
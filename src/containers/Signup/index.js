import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
//import Input from '../../components/UI/Input';

/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const history = useHistory();
  const handleOnClick = () => history.push('/user/home');
  const [loader, setloader] = useState(false);
  const [signup, setsignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU",
  });
  const handleDataChange = (e) => {
    const { name, value } = e.target
    setsignup({ ...signup, [name]: value })
  };
  const OnFormSubmit = (e) => {
    e.preventDefault();
    usersignup();
    setsignup({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU",
    })
  };
  const usersignup = async () => {
    setloader(true);
    try {
      const res = await axios.post(`http://localhost:2000/signup`, signup);
      console.log(res)
      setloader(false);
      setsignup({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU",
      })
      const token_u = res.data.token;
      const user_u = res.data.user;
      let t = JSON.stringify(token_u)
      let u = JSON.stringify(user_u)
      localStorage.setItem('token', t);
      localStorage.setItem('user', u);
      localStorage.setItem('isLoggedIn', true);
      toast.success("SignUp Successfully")
      handleOnClick();
    } catch (error) {
      console.log("error", error);
      setloader(false);
      toast.error("Signup Failed")
    }
  };

  const uploadprofilePicture = async e => {
    toast.warning("Wait..")
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'EcommerceImages')

    const res = await fetch("https://api.cloudinary.com/v1_1/gauravtyp/image/upload", {
      method: 'POST',
      body: data
    })

    const file = await res.json()
    toast.success("Image Uploaded")

    return file.secure_url;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={(e) => OnFormSubmit(e)} >
              <Row>
                <Col md={6}>
                  <label>First Name</label>
                  <input
                    id="fname"
                    placeholder="First Name"
                    value={signup.firstName}
                    name="firstName"
                    type="text"
                    onChange={(e) => handleDataChange(e)}
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
                    onChange={(e) => handleDataChange(e)}
                  />
                </Col>
              </Row>
              <label>Email</label>
              <input
                //label="Email"
                placeholder="Email"
                value={signup.email}
                name="email"
                type="email"
                onChange={(e) => handleDataChange(e)}
              />
              <label>Password</label>
              <input
                //label="Password"
                placeholder="Password"
                value={signup.password}
                name="password"
                type="password"
                onChange={(e) => handleDataChange(e)}
              /><br></br>
                <input
                  type="file"
                  name="profilePicture"
                  placeholder="profilePicture url"
                  onChange={async (e) => {
                    const url = await uploadprofilePicture(e)
                    setsignup({ ...signup, ["profilePicture"]: url });
                    console.log("url", url);

                  }} 
                />
              {
                loader ? (
                  <Button variant="primary" type="submit" id="signup" >
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
                loader ? ("") : (<Button variant="primary" type="submit" id="signup">
                  Signup
                </Button>)
              }
            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>
  )

}

export default Signup;
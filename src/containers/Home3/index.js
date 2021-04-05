import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout3 from '../../components/Layout3';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

/**
* @author
* @function Home
**/

const Home3 = (props) => {
  const history = useHistory();
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [allProducts, setallProducts] = useState([]);
  //fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/getAllProducts`);
      console.log("data", res.data);
      setallProducts(res.data.products);
      toast.info("Products Fetched Successfully")
    } catch (error) {
      console.log("error", error);
      toast.error("Products Fetching Failed")
    }
  };
  //useEffect
  let token_u = localStorage.getItem('token');
  let token = JSON.parse(token_u);
  let user_u = localStorage.getItem('user');
  let user = JSON.parse(user_u);
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')=="false") {
      history.push('/signin');
    }
    else if (user.userType === 'user') {
      history.push('/user/home');
    } else {
      fetchProducts();
    }
  }, []);
  
  return (
    <Layout3>
      <Jumbotron style={{ margin: '5rem', background: '#f7f5f5' }} className="text-center">
        <h1 className="homeTitleHead">Welcome to E-Digital Cart</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
      </Jumbotron>
      <CardGroup>
        {
          allProducts.map((item) => {
            return (
              <Col style={{ marginBottom: "2%" }} md={{ span: 3, offset: 0 }}>
                <Card >
                  <Card.Img variant="top" src={'https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/amazon-alexa-event-sept-2019.jpg'} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.price}:Rs
                  </Card.Text>
                    <Card.Text>
                      {item.author}: Seller
                  </Card.Text>
                  </Card.Body>
                  
                </Card>

              </Col>
            )
          })
        }

      </CardGroup>

    </Layout3>
  )

}

export default Home3;
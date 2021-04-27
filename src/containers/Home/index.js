import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Particle from './particles';

/**
* @author
* @function Home
**/

const Home = (props) => {
  const history = useHistory();
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [allProducts, setallProducts] = useState([]);
  //fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://e-commerce-serve-r.herokuapp.com/getAllProducts`);
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
  let user_u = localStorage.getItem('user');
  let token = JSON.parse(token_u);
  let user = JSON.parse(user_u);
  useEffect(() => {
    fetchProducts();
  }, [])
  //place Order
  const PlaceOrder = () => {
    setloader(true);
    if (localStorage.getItem('isLoggedIn') == "false") {
      toast.warning('Signin Required');
      setloader(false);
      history.push('/signin');
    } setloader(false);
    //try {
    //  const res = await axios.post(`http://localhost:2000/placeOrder?productId=${_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    //  setloader(false);
    //  toast.info("Order Placed Successfully")
    //  //console.log(res)
    //} catch (error) {
    //  console.log("error", error);
    //  setloader(false);
    //  toast.warning("Product Not Placed")
    //}
  };
  //Add To Wishlist
  const addwishlist = () => {
    setloader2(true);
    if (localStorage.getItem('isLoggedIn') == "false") {
      toast.warning('Signin Required');
      setloader2(false);
      history.push('/signin');
    } setloader2(false);
    //try {
    //  const res = await axios.post(`http://localhost:2000/addWishlist?productId=${_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    //  setloader2(false);
    //  toast.info("Added To Wishlist Successfully")
    //  //console.log(res)
    //} catch (error) {
    //  console.log("error", error);
    //  setloader2(false);
    //  toast.warning("Product Not Added")
    //}
  };
  return (
    <Layout>
      <Particle />
      <Jumbotron id="jumbo2" style={{ background: '#f7f5f5' }} className="text-center">
        <h1 className="homeTitleHead">E-Digital Cart</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
      </Jumbotron>
      <CardGroup style={{background: "#fff"}}>
        <div className="allProduct2">
          <h2 className="allProductHead2">*Devices/SmartPhones</h2>
        </div>
        {
          allProducts.map((item) => {
            if (item.category == "Devices/SmartPhones") {
              return (
                <Col style={{ marginBottom: "2%" }} md={{ span: 3, offset: 0 }}>
                  <Card >
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        <b>₹{item.price}</b>
                      </Card.Text>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                      <Card.Text>
                        {item.category}: <b>Category</b>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/*<small className="text-muted">Last updated {item.updatedAt}</small><br></br>*/}
                      {
                        loader ? (
                          <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder()}>
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
                        loader ? ("") : (
                          <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder()}>Place Order</Button>
                        )
                      }

                      {
                        loader2 ? (
                          <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist()}>
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
                        loader2 ? ("") : (
                          <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist()}>Add To Wishlist</Button>
                        )
                      }

                    </Card.Footer>
                  </Card>

                </Col>
              )
            }

          })
        }

      </CardGroup>
      <hr></hr>
      <CardGroup style={{marginTop: "3%", background: "#fff"}}>
        <div className="allProduct2">
          <h2 className="allProductHead2">*Fashion(Boy/Girl)</h2>
        </div>
        {
          allProducts.map((item) => {
            if (item.category == "Fashion") {
              return (
                <Col style={{ marginBottom: "2%" }} md={{ span: 3, offset: 0 }}>
                  <Card >
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        <b>₹{item.price}</b>
                      </Card.Text>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                      <Card.Text>
                        {item.category}: <b>Category</b>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/*<small className="text-muted">Last updated {item.updatedAt}</small><br></br>*/}
                      {
                        loader ? (
                          <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder()}>
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
                        loader ? ("") : (
                          <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder()}>Place Order</Button>
                        )
                      }

                      {
                        loader2 ? (
                          <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist()}>
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
                        loader2 ? ("") : (
                          <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist()}>Add To Wishlist</Button>
                        )
                      }

                    </Card.Footer>
                  </Card>

                </Col>
              )
            }

          })
        }

      </CardGroup>

      <hr></hr>
      <CardGroup style={{marginTop: "3%", background: "#fff"}}>
        <div className="allProduct2">
          <h2 className="allProductHead2">*Home Furnishing</h2>
        </div>
        {
          allProducts.map((item) => {
            if (item.category == "Home Furnishing") {
              return (
                <Col style={{ marginBottom: "2%" }} md={{ span: 3, offset: 0 }}>
                  <Card >
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        <b>₹{item.price}</b>
                      </Card.Text>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                      <Card.Text>
                        {item.category}: <b>Category</b>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {/*<small className="text-muted">Last updated {item.updatedAt}</small><br></br>*/}
                      {
                        loader ? (
                          <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder()}>
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
                        loader ? ("") : (
                          <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder()}>Place Order</Button>
                        )
                      }

                      {
                        loader2 ? (
                          <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist()}>
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
                        loader2 ? ("") : (
                          <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist()}>Add To Wishlist</Button>
                        )
                      }

                    </Card.Footer>
                  </Card>

                </Col>
              )
            }

          })
        }

      </CardGroup>

    </Layout>
  )

}

export default Home;
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';

/**
* @author
* @function Home
**/

const Home = (props) => {
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
  useEffect(() => {
    fetchProducts();
  }, [])
  //place Order
  const PlaceOrder = async (_id) => {
    setloader(true);
    try {
      const res = await axios.post(`http://localhost:2000/placeOrder?productId=${_id}`);
      setloader(false);
      toast.info("Order Placed Successfully")
      //console.log(res)
    } catch (error) {
      console.log("error", error);
      setloader(false);
      toast.warning("Product Not Placed")
    }
  };
  //Add To Wishlist
  const addwishlist = async (_id) => {
    setloader2(true);
    try {
      const res = await axios.post(`http://localhost:2000/addWishlist?productId=${_id}`);
      setloader2(false);
      toast.info("Added To Wishlist Successfully")
      //console.log(res)
    } catch (error) {
      console.log("error", error);
      setloader2(false);
      toast.warning("Product Not Added")
    }
  };
  return (
    <Layout>
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
                  <Card.Footer>
                    {/*<small className="text-muted">Last updated {item.updatedAt}</small><br></br>*/}
                    {
                      loader ? (
                        <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder(item._id)}>
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
                      <Button className="productBtn1" variant="warning" onClick={() => PlaceOrder(item._id)}>Place Order</Button>
                      )
                    }
                    
                    {
                      loader2 ? (
                        <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist(item._id)}>
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
                        <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => addwishlist(item._id)}>Add To Wishlist</Button>
                      )
                    }
                    
                  </Card.Footer>
                </Card>

              </Col>
            )
          })
        }

      </CardGroup>

    </Layout>
  )

}

export default Home;
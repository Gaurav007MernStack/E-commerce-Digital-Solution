import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout2 from '../../components/Layout2';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
* @author
* @function Orders
**/

const Orders = (props) => {
  const [loader, setloader] = useState(false);
  const history = useHistory();
  const handleOnClick = () => history.push('/user/myWishlist');
  const [order, setorder] = useState([]);
  //get MyOrders For Admin
  const fetchmyorders = async () => {
    try {
      const res = await axios.get(`https://e-commerce-serve-r.herokuapp.com/myOrders`, { headers: { 'Authorization': `Bearer ${token}` } });
      setorder(res.data);
      toast.info("Orders Data Fetched")
    } catch (error) {
      console.log("error", error);
      toast.error("Server Error")
    }
    //console.log("res",allmyorders);
  };
  //useEffect
  let token_u = localStorage.getItem('token');
  let token = JSON.parse(token_u);
  let user_u = localStorage.getItem('user');
  let user = JSON.parse(user_u);
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      history.push('/signin');
    }
    else if (user.userType === 'admin') {
      history.push('/admin/home');
    } else {
      fetchmyorders();
    }
  }, []);
  const deleteOrder = async (_id) => {
    setloader(true);
    try {
      const res = await axios.delete(`https://e-commerce-serve-r.herokuapp.com/deleteOrder/${_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
      fetchmyorders();
      setloader(false)
    } catch (error) {
      console.log("error", error);
      setloader(false)
    }
  };
  return (
    <Layout2>
      <div className="wishlist">
        <div className="wSide">
          <div className="wishlistTitle">
            <h2 className="wTitle">Profile</h2>
          </div>
          <div className="userProfile">
            <div className="userImg" ><img id="userLogo" style={{ width: "100px" }} src={user.profilePicture} alt=""></img></div>
            <p className="userfName">{user.firstName}</p>
          </div>
          <div className="userOrder">
            <div className="orderTitile">My Wishlist</div>
            <button type="button" onClick={handleOnClick} className="orderIcon">{'>'}</button>
          </div>


        </div>
        <div className="wMain">
          <div className="wishlistTitle">
            <h2 className="wTitle">My Orders</h2>
          </div>
          <CardGroup>
            {
              order.map((item) => {
                return (
                  <Col style={{ marginBottom: "2%", textAlign: "center" }} md={{ span: 10, offset: 1 }}>
                    <Card >
                      <Card.Img variant="top" src={item.Products[0].image} />
                      <Card.Body>
                        <Card.Title>{item.Products[0].title}</Card.Title>
                        <Card.Text>
                          <b>???{item.Products[0].price}</b>
                        </Card.Text>
                        <Card.Text>
                          {item.Products[0].description}
                        </Card.Text>
                        <Card.Text>
                          {item.Products[0].category}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        {
                          loader ? (
                            <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteOrder(item._id)}>
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
                            <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteOrder(item._id)}>Remove</Button>
                          )
                        }
                      </Card.Footer>
                    </Card>
                  </Col>
                )
              })
            }
          </CardGroup>
        </div>
      </div>
    </Layout2>
  )

}

export default Orders;
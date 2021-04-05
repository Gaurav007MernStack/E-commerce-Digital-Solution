import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout2 from '../../components/Layout2';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
* @author
* @function Wishlist
**/

const Wishlist = (props) => {
  const [loader, setloader] = useState(false);
  const history = useHistory();
  const handleOnClick = () => history.push('/user/myOrders');
  const [wishlist, setwishlist] = useState([]);
  //get Wishlist For Admin
  const fetchwishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/myWishlist`, { headers: { 'Authorization': `Bearer ${token}` } });
      setwishlist(res.data);
      toast.info("WishList Data Fetched")
    } catch (error) {
      console.log("error", error);
      toast.error("Server Error")
    }
    //console.log("res",allwishlist);
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
      fetchwishlist();
    }
  }, []);
  const deleteWishlist = async (_id) => {
    setloader(true);
    try {
      const res = await axios.delete(`http://localhost:2000/deletewishlist/${_id}`, { headers: { 'Authorization': `Bearer ${token}` } });
      fetchwishlist();
      setloader(false);
    } catch (error) {
      console.log("error", error);
      setloader(false);
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
            <div className="userImg" ><img id="userLogo" style={{ width: "100px" }} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU'} alt=""></img></div>
            <p className="userfName">{user.firstName}</p>
          </div>
          <div className="userOrder">
            <div className="orderTitile">My Orders</div>
            <button type="button" onClick={handleOnClick} className="orderIcon">{'>'}</button>
          </div>


        </div>
        <div className="wMain">
          <div className="wishlistTitle">
            <h2 className="wTitle">My Wishlist</h2>
          </div>
          {/*<div className="wishlistUser">
              <div className="wishlistImg">
                <img style={{width: "100px", borderRadius: "50px"}} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFOIQ61dANi9G6uAOE-8363t5GWYi554CkA&usqp=CAU'} alt="Key Chain"></img>
              </div>
              <div className="wishlistDescription">
                <h2>{wishlist.Products[0].title}</h2>
                <h5>{wishlist.Products[0].price}:Rs</h5>
                <p>{wishlist.Products[0].author}</p>
              </div>
              <div className="wishlistDelete">
                <button id="wishlistDelete">X</button>
              </div>
            </div>*/}
          <CardGroup>
            {
              wishlist.map((item) => {
                return (
                  <Col style={{ marginBottom: "2%", textAlign: "center" }} md={{ span: 10, offset: 1 }}>
                    <Card >
                      <Card.Img variant="top" src={'https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/amazon-alexa-event-sept-2019.jpg'} />
                      <Card.Body>
                        <Card.Title>{item.Products[0].title}</Card.Title>
                        <Card.Text>
                          {item.Products[0].price}:Rs
                      </Card.Text>
                        <Card.Text>
                          {item.Products[0].author}: Seller
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        {
                          loader ? (
                            <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteWishlist(item._id)}>
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
                            <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteWishlist(item._id)}>Remove</Button>
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

export default Wishlist;
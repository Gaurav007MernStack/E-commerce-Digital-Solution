import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout3 from '../../components/Layout3';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
//import Input from '../../components/UI/Input';
/**
* @author
* @function allOrders
**/
const AllOrders = (props) => {
    const history = useHistory();
    const [loader, setloader] = useState(false);
    const [loader2, setloader2] = useState(false);
    const [allOrders, setallOrders] = useState([]);

    //get Orders For Admin
    const fetchOrders = async () => {
        try {
            const res = await axios.get(`https://e-commerce-serve-r.herokuapp.com/getAllOrders`,{headers:{"Authorization":`Bearer ${token}`}});
            setallOrders(res.data);
            toast.success("Orders Fetched Successfully")
            //console.log("this",allOrders)
        } catch (error) {
            console.log("error", error);
            toast.error("Order Fetching Error")
        }
        //console.log("res",allOrders);
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
      fetchOrders();
    }
  }, []);
    //fetchOrders();

    //delete Order from DB
    const deleteOrder = async (_id) => {
        setloader2(true)
        try {
            const res = await axios.delete(`https://e-commerce-serve-r.herokuapp.com/admin/deleteOrder/${_id}`);
            setloader2(false)
            toast.success("Order Deleted")
            fetchOrders();
        } catch (error) {
            console.log("error", error);
            setloader2(false)
            toast.error("Error in Deletion")
        }
    };
    //update Order
    const updateOrder = async (_id) => {
        setloader(true)
        try {
            const res = await axios.update(`https://e-commerce-serve-r.herokuapp.com/admin/updateProduct/${_id}`);
            setloader(false)
            toast.success("Order Updated Successfully")
        } catch (error) {
            console.log("error", error);
            setloader(false)
            toast.error("Order Updation Error")
        }
    };

    return (
        <Layout3>
            <div className="allProduct">
                <h2 className="allProductHead">All Orders</h2>
            </div>
            <CardGroup>
                {
                    allOrders.map((item) => {
                        return (
                            <Col style={{ marginBottom: "2%", background: "#fff" }} md={{ span: 4, offset: 0 }}>
                                <Card >
                                    <Card.Img variant="top" src={item.Products[0].image} />
                                    <Card.Body>
                                        <Card.Title>{item._id}<b><i>:Order_Id</i></b></Card.Title>
                                        <Card.Text>
                                            <b>{item.Products[0]._id}</b>:Product_Id
                                        </Card.Text>
                                        <Card.Text>
                                            <b>{item.Products[0].title}</b>:Product
                                        </Card.Text>
                                        <Card.Text>
                                            <b>₹{item.Products[0].price}</b>
                                        </Card.Text>
                                        <Card.Text>
                                            <b>{item.owner._id}</b>: User_Id
                                        </Card.Text>
                                        <Card.Text>
                                            <b>{item.owner.firstName}</b>:Customer_Name
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated {item.updatedAt}</small><br></br>
                                        {
                                            loader ? (
                                                <Button className="productBtn1" onClick={() => updateOrder(item._id)}>
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
                                                <Button className="productBtn1" onClick={() => updateOrder(item._id)}>Update</Button>
                                            )
                                        }

                                        {
                                            loader2 ? (
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
                                            loader2 ? ("") : (
                                                <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteOrder(item._id)}>Delete</Button>
                                            )
                                        }
                                        
                                    </Card.Footer>
                                </Card>

                            </Col>
                        )
                    })
                }

            </CardGroup>
        </Layout3>
    )
}
export default AllOrders;
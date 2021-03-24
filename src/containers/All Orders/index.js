import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
//import Input from '../../components/UI/Input';
/**
* @author
* @function allOrders
**/
const AllOrders = (props) => {
    const [loader, setloader] = useState(false);
    const [loader2, setloader2] = useState(false);
    const [allOrders, setallOrders] = useState([]);

    //get Orders For Admin
    const fetchOrders = async () => {
        try {
            const res = await axios.get(`http://localhost:2000/getAllOrders`);
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
    useEffect(() => {
        fetchOrders();
    }, [])
    //fetchOrders();

    //delete Order from DB
    const deleteOrder = async (_id) => {
        setloader2(true)
        try {
            const res = await axios.delete(`http://localhost:2000/admin/deleteOrder/${_id}`);
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
            const res = await axios.update(`localhost:2000/admin/updateProduct/${_id}`);
            setloader(false)
            toast.success("Order Updated Successfully")
        } catch (error) {
            console.log("error", error);
            setloader(false)
            toast.error("Order Updation Error")
        }
    };

    return (
        <Layout>
            <div className="allProduct">
                <h2 className="allProductHead">All Orders</h2>
            </div>
            <CardGroup>
                {
                    allOrders.map((item) => {
                        return (
                            <Col style={{ marginBottom: "2%" }} md={{ span: 4, offset: 0 }}>
                                <Card >
                                    <Card.Img variant="top" src={'https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/amazon-alexa-event-sept-2019.jpg'} />
                                    <Card.Body>
                                        <Card.Title>{item._id}<b><i>:Order_Id</i></b></Card.Title>
                                        <Card.Text>
                                            <b>{item.Products[0]._id}</b>:Product_Id
                                        </Card.Text>
                                        <Card.Text>
                                            <b>{item.Products[0].title}</b>:Product
                                        </Card.Text>
                                        <Card.Text>
                                            <b>{item.Products[0].price}</b>:Rs
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
        </Layout>
    )
}
export default AllOrders;
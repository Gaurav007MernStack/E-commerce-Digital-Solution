import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, CardGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Layout3 from '../../components/Layout3';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
//import Input from '../../components/UI/Input';

/**
* @author
* @function allProducts
**/

const AllProducts = (props) => {
  const history = useHistory();
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [loader3, setloader3] = useState(false);
  const [loader4, setloader4] = useState(false);
  const [allProducts, setallProducts] = useState([]);
  //console.log(allProducts)
  const [addProduct, setaddProduct] = useState({
    title: "",
    price: Number,
    author: "",
  });
  const [id, setid] = useState({
    id: "",
  });
  const handleDataChange = (e) => {
    const { name, value } = e.target
    setaddProduct({ ...addProduct, [name]: value })
  };
  const OnFormSubmit = (e) => {
    e.preventDefault();
    createProduct();
    //console.log(addProduct);
    setaddProduct({
      title: "",
      price: Number,
      author: "",
    })
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/getAllProducts`);
      console.log("data", res.data);
      setallProducts(res.data.products);
      toast.success("Products Fetched Successfully")
    } catch (error) {
      console.log("error", error);
      toast.error("Product Fetching Error")
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
  //fetchProducts();
  // post data on DB by from Submit
  const createProduct = async () => {
    setloader(true)
    try {
      const res = await axios.post(`http://localhost:2000/admin/addProduct`,addProduct,{headers:{"Authorization":`Bearer ${token}`}});
      setloader(false)
      fetchProducts();
      toast.info("Product Created Successfully")
    } catch (error) {
      console.log("error", error.response);
      setloader(false)
      toast.error("Product Creation Failed")
    }
  };
  //delete Product from DB
  const deleteProduct = async (_id) => {
    setloader4(true)
    try {
      const res = await axios.delete(`http://localhost:2000/admin/deleteProduct/${_id}`,{headers:{"Authorization":`Bearer ${token}`}});
        setloader4(false)
        fetchProducts();
        toast.info("Product Deleted Successfully")
    } catch (error) {
      console.log("error", error);
      setloader4(false)
      toast.error("Product Deletion Failed")
    }
  };
  //for getting user Data after click on Update
  const getSingleProduct = async (_id, title, price, author) => {
    setloader3(true)
    try {
      //const res = await axios.get(`http://localhost:2000/admin/getProductBYId/${_id}`);
      setaddProduct({
        title: title,
        price: price,
        author: author,
      });
      setid({
        id: _id,
      });
      setloader3(false)
    } catch (error) {
      console.log("error", error);
      setloader3(false)
    }
  }
  // for put data into DB
  const updateProduct = async (id) => {
    setloader2(true)
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addProduct)
      };
      const res = await axios.put(`http://localhost:2000/admin/updateProduct/${id}`,addProduct,{headers:{"Authorization":`Bearer ${token}`}});
      setaddProduct({
        title: "",
        price: Number,
        author: "",
      })
      setloader2(false)
      fetchProducts();
      toast.info("Product Updated Successfully")
    } catch (error) {
      console.log("error", error);
      setloader2(false)
      toast.error("Product Updation Failed")
      setaddProduct({
        title: "",
        price: Number,
        author: "",
      })
    }
  };
  const [state, setState] = useState({
    selectedFiles: null
  });
  const fileSelectedHandler = event => {
    setState({
      selectedFiles: event.target.files[0]
    })
  };
  const fileUploadHandler = () =>{

  };

  return (
    <Layout3>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={(e) => OnFormSubmit(e)} >
              <label>Title</label>
              <input
                placeholder="Title"
                name="title"
                value={addProduct.title}
                type="text"
                onChange={(e) => handleDataChange(e)}
              />
              <label>Price</label>
              <input
                placeholder="Price"
                name="price"
                value={addProduct.price}
                type="Number"
                onChange={(e) => handleDataChange(e)}
              />
              <label>Author</label>
              <input
                placeholder="Author"
                name="author"
                value={addProduct.author}
                type="text"
                onChange={(e) => handleDataChange(e)}
              /><br></br>
              <input type="file" onChange={fileSelectedHandler} />
              <Button onClick={fileUploadHandler}>Upload</Button><br></br><br></br>
              {
                loader ? (
                  <Button variant="primary" type="submit" id="addProduct">
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
                  <Button variant="primary" type="submit" id="addProduct">Add_Product</Button>
                )
              }

              {
                loader2 ? (
                  <Button className="ml-2" variant="warning" id="updateProduct" onClick={() => updateProduct(id.id)}>
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
                  <Button className="ml-2" variant="warning" id="updateProduct" onClick={() => updateProduct(id.id)}>Update_Product</Button>
                )
              }


            </Form>
          </Col>
        </Row>

      </Container>
      <div className="allProduct">
        <h2 className="allProductHead">All Products</h2>
      </div>
      <CardGroup>
        {
          allProducts.map((item) => {
            return (
              <Col style={{ marginBottom: "2%" }} md={{ span: 2, offset: 0 }}>
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
                    <small className="text-muted">Last updated {item.updatedAt}</small>
                    {
                      loader3 ? (
                        <Button className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.author)}>
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
                      loader3 ? ("") : (
                        <Button className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.author)}>Update</Button>
                      )
                    }
                    
                    {
                      loader4 ? (
                        <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteProduct(item._id)}>
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
                      loader4 ? ("") : (
                        <Button style={{ marginLeft: "2%" }} variant="danger" className="productBtn2" onClick={() => deleteProduct(item._id)}>Delete</Button>
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

export default AllProducts;
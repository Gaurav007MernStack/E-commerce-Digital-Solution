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
      description: "",
      category: "",
      image: "",
    })
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://e-commerce-serve-r.herokuapp.com/getAllProducts`);
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
    if (localStorage.getItem('isLoggedIn') == "false") {
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
      const res = await axios.post(`https://e-commerce-serve-r.herokuapp.com/admin/addProduct`, addProduct, { headers: { "Authorization": `Bearer ${token}` } });
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
      const res = await axios.delete(`https://e-commerce-serve-r.herokuapp.com/admin/deleteProduct/${_id}`, { headers: { "Authorization": `Bearer ${token}` } });
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
  const getSingleProduct = async (_id, title, price, description, category) => {
    setloader3(true)
    try {
      //const res = await axios.get(`https://e-commerce-serve-r.herokuapp.com/admin/getProductBYId/${_id}`);
      setaddProduct({
        title: title,
        price: price,
        description: description,
        category: category,
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
      const res = await axios.put(`https://e-commerce-serve-r.herokuapp.com/admin/updateProduct/${id}`, addProduct, { headers: { "Authorization": `Bearer ${token}` } });
      setaddProduct({
        title: "",
        price: Number,
        description: "",
        category: "",
        image: "",
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
        description: "",
        category: "",
        image: "",
      })
    }
  };
  //For Uploading Files IN Cloudinary
  const uploadImage = async e => {
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
    console.log(file)
    toast.success("Image Uploaded")
    return file.secure_url;
  }
  return (
    <Layout3>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={(e) => OnFormSubmit(e)} encType='multipart/form-data' >
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
              <label>Description</label>
              <input
                placeholder="Description"
                name="description"
                value={addProduct.description}
                type="text"
                onChange={(e) => handleDataChange(e)}
              />
              <label>Category</label>
              <input
                placeholder="Category"
                name="category"
                value={addProduct.category}
                type="text"
                onChange={(e) => handleDataChange(e)}
              /><br></br>
              <input
                type="file"
                name="image"
                placeholder="image url"
                onChange={async (e) => {
                  const url = await uploadImage(e)
                  setaddProduct({ ...addProduct, ["image"]: url });
                  console.log("url", url);

                }} />
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
      <CardGroup style={{background: "#fff"}}>
      <div className="allProduct2">
        <h2 className="allProductHead2">*Devices/SmartPhones</h2>
      </div>
        {
          allProducts.map((item) => {
            if(item.category == "Devices/SmartPhones"){
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
                    <small className="text-muted">Last updated {item.updatedAt}</small>
                    {
                      loader3 ? (
                        <Button style={{ marginLeft: "25%" }} className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.description, item.category)}>
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
                        <Button style={{ marginLeft: "25%" }} className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.description, item.category)}>Update</Button>
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
            )}
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
            if(item.category == "Fashion"){
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
                    <small className="text-muted">Last updated {item.updatedAt}</small>
                    {
                      loader3 ? (
                        <Button style={{ marginLeft: "25%" }} className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.description, item.category)}>
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
                        <Button style={{ marginLeft: "25%" }} className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.description, item.category)}>Update</Button>
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
            )}
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
            if(item.category == "Home Furnishing"){
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
                    <small className="text-muted">Last updated {item.updatedAt}</small>
                    {
                      loader3 ? (
                        <Button style={{ marginLeft: "25%" }} className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.description, item.category)}>
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
                        <Button style={{ marginLeft: "25%" }} className="productBtn1" onClick={() => getSingleProduct(item._id, item.title, item.price, item.description, item.category)}>Update</Button>
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
            )}
          })
        }

      </CardGroup>
    </Layout3>
  )

}

export default AllProducts;
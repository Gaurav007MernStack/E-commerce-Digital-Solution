import React,{useState} from 'react';
import Layout2 from '../../components/Layout2';

/**
* @author
* @function Orders
**/

const Orders = (props) => {
  const [order,setorder] = useState({
    "Products": [
        {
            "_id": "604783abc1d891411cc6f2bc",
            "title": "Key Chain",
            "price": 100,
            "author": "User_Admin",
            "createdAt": "2021-03-09T14:18:19.274Z",
            "updatedAt": "2021-03-09T14:18:19.274Z",
            "__v": 0
        }
    ],
    "_id": "6053189b09795e305cbeef52",
    "owner": {
        "userType": "user",
        "_id": "60472e31bd6afc0784ead17f",
        "firstName": "user",
        "lastName": "Singh",
        "email": "user@gmail.com",
        "password": "$2a$08$M7hU9KG/qXqQPk2rzu2G.e6GeWEDSl/gKaiKFeZ6Ip0W.mlWZ69by",
        "createdAt": "2021-03-09T08:13:37.880Z",
        "updatedAt": "2021-03-09T08:13:37.880Z",
        "__v": 0
    },
    "createdAt": "2021-03-18T09:08:43.131Z",
    "updatedAt": "2021-03-18T09:08:43.131Z",
    "__v": 0
});
  return(
    <Layout2>
        <div className="order">
        <div className="wSide">
          <div className="userProfile">
            <div className="userImg" ><img id="userLogo" style={{width: "100px"}}src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU'} alt=""></img></div>
            <p className="userfName">{order.owner.firstName}</p><div/>
          </div>
          <div className="userOrder">
            <div className="orderTitile">My Wishlist</div>
            <button className="orderIcon">{'>'}</button>
          </div>
        </div>
          <div className="wMain">
            <div className="orderTitle">
              <h2 className="wTitle">My orders</h2>
            </div>
            <div className="orderUser">
              <div className="orderImg">
                <img style={{width: "100px", borderRadius: "50px"}} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFOIQ61dANi9G6uAOE-8363t5GWYi554CkA&usqp=CAU'} alt="Key Chain"></img>
              </div>
              <div className="orderDescription">
                <h2>{order.Products[0].title}</h2>
                <h5>{order.Products[0].price}:Rs</h5>
                <p>{order.Products[0].author}</p>
              </div>
              <div className="orderDelete">
                <button id="orderDelete">X</button>
              </div>
            </div>

            
          </div>
        </div>
    </Layout2>
   )

 }

export default Orders;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Error from './containers/Error/index';
import Wishlist from './containers/Wishlist';
import Orders from './containers/Orders';
import AllOrders from './containers/All Orders';
import AllProducts from './containers/All Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/myWishlist' component={Wishlist} />
          <Route path='/myOrders' component={Orders} />
          <Route path='/getAllOrders' component={AllOrders} />
          <Route path='/getAllProducts' component={AllProducts} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

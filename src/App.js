import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Home2 from './containers/Home2';
import Home3 from './containers/Home3';
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
        autoClose={1000}
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
          <Route path='/user/home' exact component={Home2} />
          <Route path='/admin/home' exact component={Home3} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/user/myWishlist' component={Wishlist} />
          <Route path='/user/myOrders' component={Orders} />
          <Route path='/admin/getAllOrders' component={AllOrders} />
          <Route path='/admin/getAllProducts' component={AllProducts} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

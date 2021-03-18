import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Error from './containers/Error/index';
import Wishlist from './containers/Wishlist';
import Orders from './containers/Orders';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/myWishlist' component={Wishlist} />
          <Route path='/myOrders' component={Orders} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import ProductList from "./component/products/ProductList";
import ProductAdmin from "./component/products/ProductAdmin";
import CreateProduct from "./component/products/CreateProduct";
import UpdateProduct from "./component/products/UpdateProduct";


function App() {
  return (
    <div className="App">

        <Router>
            <Navbar/>

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/products' component={ProductList}/>
                <Route exact path='/admin' component={ProductAdmin}/>
                <Route exact path='/create-product' component={CreateProduct}/>
                <Route exact path='/update-product/:id' component={UpdateProduct}/>
            </Switch>
        </Router>


      

    </div>
  );
}

export default App;

import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Product from "./components/products.component";
import Tags from "./components/tags.component";
import Gondulas from "./components/gondolas.component";


class Dashboard extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top nav-justified">
                        <div className="container">
                            <Link className="navbar-brand" to={"/sign-in"}> <img  src={require("./images/logo.jpg")} width='25%' height='50%'/></Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/products"}>Produtos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/tags"}>Etiquetas</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/gondulas"}>Gondulas</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="auth-wrapper">
                        <div className="table-inner">
                            <Switch>
                                <Route exact path='/' component={Dashboard} />
                                <Route path="/products" component={Product} />
                                <Route path="/tags" component={Tags} />
                                <Route path="/gondulas" component={Gondulas}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
export default Dashboard;

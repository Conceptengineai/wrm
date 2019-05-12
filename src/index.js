import ReactDOM from "react-dom";
// 
// import AppRouter from "./js/Router";
// 
import "./css/style.scss";

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

class App extends React.Component {
    render() {
        return (
            <Router>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </Router>
        );
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById("wrm")
);

// export { App };
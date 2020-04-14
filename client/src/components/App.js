import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route path="/" exact component={Dashboard} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

const MappingList = () => {
    return <div>MappingLis</div>;
};

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/list" exact component={MappingList} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

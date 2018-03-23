
import { BrowserRouter, HashRouter,Route, Link } from 'react-router-dom'
import React, { Component } from 'react';
import MainTable from "./Form";
import App from "./App";
import Title from "./Title"

class Routers extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Route exact path="/" component={Title} />
                    <Route path="/question" component={MainTable}/>
                </App>
            </HashRouter>
        )
    }
}

export default Routers;
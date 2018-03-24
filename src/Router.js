
import { BrowserRouter, HashRouter,Route, Link } from 'react-router-dom'

import React, { Component } from 'react';
import MainTable from "./Form";
import App from "./App";
import Title from "./Title"
import Browse from "./Browse";

class Routers extends React.Component{
    constructor(prop){
        super(prop);


    }
    render(){
        return(
            <HashRouter>
                <App>
                    <Route exact path="/" component={Title} />
                    <Route path="/question" component={MainTable}/>
                    <Route path="/:id" component={Detail}/>
                </App>
            </HashRouter>
        )
    }
}

const Detail = ({ match }) => {
    console.log(match)
    if (match.params.id !== "question"){
    return (
            <Browse id={match.params.id} />

    )}
    else {return(<p></p>)}
}
export default Routers;

import { BrowserRouter, HashRouter,Route, Link } from 'react-router-dom'
<<<<<<< HEAD

=======
>>>>>>> 61e6e9bebe51b3997ec59830e4e10ff772b8a270
import React, { Component } from 'react';
import MainTable from "./Form";
import App from "./App";
import Title from "./Title"
<<<<<<< HEAD
import Browse from "./Browse";

class Routers extends React.Component{
    constructor(prop){
        super(prop);


    }
=======

class Routers extends React.Component{
>>>>>>> 61e6e9bebe51b3997ec59830e4e10ff772b8a270
    render(){
        return(
            <HashRouter>
                <App>
                    <Route exact path="/" component={Title} />
                    <Route path="/question" component={MainTable}/>
<<<<<<< HEAD
                    <Route path="/:id" component={Detail}/>
=======
>>>>>>> 61e6e9bebe51b3997ec59830e4e10ff772b8a270
                </App>
            </HashRouter>
        )
    }
}

<<<<<<< HEAD
const Detail = ({ match }) => {
    console.log(match)
    if (match.params.id !== "question"){
    return (
            <Browse id={match.params.id} />

    )}
    else {return(<p></p>)}
}
=======
>>>>>>> 61e6e9bebe51b3997ec59830e4e10ff772b8a270
export default Routers;
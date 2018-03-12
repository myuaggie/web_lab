import React, { Component } from 'react';

import {Table} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap'
//import App from "./App";


class Cell extends React.Component{
    constructor(prop){
        super(prop);
       // this.content=this.props.str;
        this.state={
            input:false,
            str:this.props.str
        };
        this.changeState=this.changeState.bind(this);
        this.changeContent=this.changeContent.bind(this);
        this.changeInput=this.changeInput.bind(this);
        this.changeIputBlur=this.changeIputBlur.bind(this);
    }

    changeState(){
        //if (this.state.input===false){
            this.setState({
                input:true
            });

    }

    changeContent(e){
        this.setState({
            str:e.target.value
        });
    }

    changeInput(e){
        //alert(e.keyCode);
        e.keyCode==='13' && this.changeIputBlur();
    }

    changeIputBlur(){
        this.setState({
            input:false
        });
    }
    render(){
        if (!this.state.input){
            return (
                <td onClick={this.changeState}>
                    {this.state.str}
                </td>
            );
        }
        else{
            return(
                <input type="text" placeholder={this.state.str}  onChange={this.changeContent} onBlur={this.changeIputBlur}  onKeyUp={this.changeInput} />
            );
        }
    }
}

class MainTable extends React.Component{
    render(){
        return(
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>d</th>
                    <th>e</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <Cell str="1"/>
                    <Cell str="a1"/>
                    <Cell str="b1"/>
                    <Cell str="c1"/>
                    <Cell str="d1"/>
                    <Cell str="e1"/>

                </tr>
                <tr>
                    <Cell str="2"/>
                    <Cell str="a2"/>
                    <Cell str="b2"/>
                    <Cell str="c2"/>
                    <Cell str="d2"/>
                    <Cell str="e2"/>

                </tr>
                <tr>
                    <Cell str="3"/>
                    <Cell str="a3"/>
                    <Cell str="b3"/>
                    <Cell str="c3"/>
                    <Cell str="d3"/>
                    <Cell str="e3"/>

                </tr>
                <tr>
                    <Cell str="4"/>
                    <Cell str="a4"/>
                    <Cell str="b4"/>
                    <Cell str="c4"/>
                    <Cell str="d4"/>
                    <Cell str="e4"/>

                </tr>
                <tr>
                    <Cell str="5"/>
                    <Cell str="a5"/>
                    <Cell str="b5"/>
                    <Cell str="c5"/>
                    <Cell str="d5"/>
                    <Cell str="e5"/>

                </tr>
                </tbody>
            </Table>
        );
    }
}

export default MainTable;
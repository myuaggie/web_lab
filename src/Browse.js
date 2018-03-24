import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import {Panel,Well,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'
import {Grid,Row,Col} from 'react-bootstrap'
import './index.css';
import {Form,FormGroup,FormControl,InputGroup,ControlLabel} from 'react-bootstrap'


class Browse extends React.Component{
    constructor(prop){
        super(prop);
        this.state={redirect:false};
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({redirect:true});
    }
    render(){
        if (this.state.redirect){
            return (<Redirect push to="/question" />)
        }
        else {
            let content=localStorage.getItem(this.props.id+"c");
            let name=localStorage.getItem(this.props.id+"n");
            let date=localStorage.getItem(this.props.id+"d");
            return (
                <Grid>
                    <Row>
                        <Col smOffset={1} sm={10}>
                            <PageHeader>{name}</PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col smOffset={1} sm={10}>
                            <small Class="Grey">创建日期：{date}</small>
                            <p> </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col smOffset={1} sm={10}>
                            <Well bsSize="large">{content}</Well>
                        </Col>
                    </Row>
                    <Row>
                        <Col smOffset={1} sm={10}>
                            <Button onClick={this.handleClick}>⬅Back</Button>
                        </Col>
                    </Row>
                    <Row>
                        <p>&emsp;</p>
                        <p>&emsp; </p>
                        <p>&emsp; </p>
                    </Row>
                    <Row>
                        <Col smOffset={1} sm={10}>
                            <textarea cols="100" rows="5" placeholder="enter here" autoFocus/>
                        </Col>
                    </Row>
                </Grid>
            )
        }
    }
}


export default Browse;
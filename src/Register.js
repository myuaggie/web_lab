import React, { Component } from 'react';

import {Form,FormGroup,FormControl,InputGroup,ControlLabel,Checkbox,Button,HelpBlock} from 'react-bootstrap'
import {Modal} from 'react-bootstrap';
import {Grid,Row,Col} from 'react-bootstrap'


class RegisterForm extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            name:null,
            email:null,
            password:null
        };
        this.name="";
        this.email="";
        this.password="";
        this.changeName=this.changeName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changePassword=this.changePassword.bind(this);
    }

    changeName(e){
        this.name=e.target.value;
        let name=this.name;
        if (name.length > 10){
            this.setState({name:"error"});
        }
        else{
            this.setState({name:"success"});
        }
    }
    changeEmail(e){
        this.email=e.target.value;
        let email=this.email;
        if (email.indexOf("@") !== -1 && (email.indexOf(".com") !== -1 || email.indexOf(".cn") !== -1)){
            this.setState({email:"success"});
        }
        else{
            this.setState({email:"error"});
        }
    }
    changePassword(e){
        this.password=e.target.value;
        let password=this.password;
        let p1=/[0-9]/;
        let p2=/[a-zA-Z]/i;
        if (password.length >=6 && p1.test(password) && p2.test(password) ){
            this.setState({password:"success"});
        }
        else{
            this.setState({password:"error"});
        }

    }
    render(){
        return(
            <Form horizontal>
                <FormGroup validationState={this.state.name}>
                    <Col sm={2}>
                        User Name
                    </Col>
                    <Col sm={10}>
                        <FormControl placeholder="User Name" onChange={this.changeName}/>
                    </Col>
                    <Col smOffset={2} sm={10}><HelpBlock>最多10个字</HelpBlock></Col>
                </FormGroup>
                <FormGroup validationState={this.state.email}>
                    <Col sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl placeholder="Email" onChange={this.changeEmail}/>
                    </Col>
                </FormGroup>

                <FormGroup validationState={this.state.password}>
                    <Col  sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" onChange={this.changePassword}/>
                    </Col>
                    <Col smOffset={2} sm={10}><HelpBlock>字母数字混合，最少6位</HelpBlock></Col>
                </FormGroup>


                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Sign up</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}


export default RegisterForm;
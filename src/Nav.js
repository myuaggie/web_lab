import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem,Button,Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LoginForm from './Login'
import RegisterForm from './Register'
class Navibar extends React.Component{
    constructor(prop){
        super(prop);
        this.handleHideL = this.handleHideL.bind(this);
        this.handleHideR = this.handleHideR.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleReg=this.handleReg.bind(this);
        this.state = {
            showLogin: false,
            showReg:false
        };
    }

    handleHideL() {
        this.setState({ showLogin: false });
    }

    handleHideR() {
        this.setState({ showReg: false });
    }

    handleLogin(){
        this.setState({ showLogin: true });
    }

    handleReg(){
        this.setState({ showReg: true });
    }
    render(){
        return(
            <div>
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Welcome</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link to="/question">错题</Link>
                        </NavItem>
                        <NavItem eventKey={2}>Link</NavItem>
                    </Nav>
                    <Nav pullRight>

                        <NavDropdown  eventKey={3} title="用户" id="basic-nav-dropdown">
                            <MenuItem onClick={this.handleLogin} eventKey={3.1}>登录</MenuItem>
                            <MenuItem onClick={this.handleReg} eventKey={3.2}>注册</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>登出</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>

                <Modal
                show={this.state.showLogin}
                onHide={this.handleHideL}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHideL}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.showReg}
                    onHide={this.handleHideR}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHideR}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Navibar;

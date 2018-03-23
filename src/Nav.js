import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Navibar extends React.Component{
    render(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Welcome</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1}><Link to="/question">错题</Link></NavItem>
                    <NavItem eventKey={2}>Link</NavItem>
                    <NavDropdown eventKey={3} title="签到" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>登录</MenuItem>
                        <MenuItem eventKey={3.2}>注册</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>登出</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default Navibar;

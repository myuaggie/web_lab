import React, { Component } from 'react';
import Background from './timg.jpeg';
import './index.css'

class Title extends React.Component{
    render(){
        return(
            <div>
                <div id="welcomePage" style={{backgroundImage: "url("+ Background + ")"}}>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p>&emsp;</p>
                    <p id="title">Welcome to my website...</p>
                    <p id="intro">We are here to help you review your mistakes.</p>
                    <p id="footer"> Contact Us @ </p>
                </div>
            </div>
            );

    }
}
export default Title;
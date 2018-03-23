import React, { Component } from 'react';
import Navibar from './Nav'

class App extends React.Component {
    render() {
        return (
            <div>
                <Navibar/>

                {this.props.children}
            </div>

        );
    }
};


export default App;

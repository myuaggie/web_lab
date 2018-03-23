import React, { Component } from 'react';

import {Table} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap'
import {Label} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Grid,Row,Col} from 'react-bootstrap'
//import App from "./App";
import constantData from './question.json'

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
       // this.changeInput=this.changeInput.bind(this);
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

   /* changeInput(e){
        //alert(e.keyCode);
        e.keyCode==='13' && this.changeIputBlur();
    }
*/
    changeIputBlur(){
        this.setState({
            input:false
        });
        if (this.props.cg==="name"){
            this.props.modify({name:this.state.str});
        }
        else if (this.props.cg==="frequency"){
            this.props.modify({frequent:this.state.str});
        }
        else if (this.props.cg==="date"){
            this.props.modify({date:this.state.str});
        }
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
                <input type="text" placeholder={this.state.str}  onChange={this.changeContent} onBlur={this.changeIputBlur}   />
            );
        }
    }
}

class Tag extends React.Component{
   constructor(prop){
       super(prop);
       this.state={
           input:false,
           tag:this.props.tag
       };
       let tag=this.props.tag;
       this.changeState=this.changeState.bind(this);
       this.changeContent=this.changeContent.bind(this);
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
            tag:e.target.value
        });
    }

    changeIputBlur(){
        this.setState({
            input:false
        });
        this.props.modify(this.tag,this.state.tag);
        this.tag=this.state.tag;
    }
   render(){
       if (!this.state.input){
           return(<Label onClick={this.changeState}>{this.state.tag}</Label>);
       }
       else{
           return(
               <input type="text" placeholder={this.state.tag}  onChange={this.changeContent} onBlur={this.changeIputBlur} />
           );
       }
   }
}


class TagGroup extends React.Component{
    constructor(prop){
        super(prop);
        this.state={tag:this.props.tag};
        this.modifyTag=this.modifyTag.bind(this);

    }
    modifyTag(oldTag,newTag){
        let tagG=this.state.tag;
        for (let i=0;i<tagG.length;i++){
            if (tagG[i]===oldTag) {tagG[i]=newTag;break;}
        }
        this.setState({tag:tagG});
        this.props.modify(this.state);
    }
    render(){
        let list=this.state.tag.map((item,i) =>(
            <Tag key={i} tag={item} modify={this.modifyTag}/>
        ));
        return(
            <td>{list}</td>
        )
    }
}

class Tuple extends React.Component{
    constructor(prop){
        super(prop);
        this.deleteTuple=this.deleteTuple.bind(this);
    }

    deleteTuple(){
        this.props.delete(this.props.seq-1);
    }
    render(){
        return(
            <tr>
                <td>{this.props.seq}</td>
                <Cell cg="name" str={this.props.name} modify={this.props.modify}/>
                <Cell cg="frequency" str={this.props.frequency} modify={this.props.modify}/>
                <Cell cg="date" str={this.props.date} modify={this.props.modify}/>
                <TagGroup tag={this.props.tag} modify={this.props.modify}/>
                <Button bsStyle="danger" onClick={this.deleteTuple}>-</Button>
            </tr>
        )
    }
}


class MainTable extends React.Component{
    constructor(prop){
        super(prop);
        this.state=constantData;
        this.modifyState=this.modifyState.bind(this);
        this.addTuple=this.addTuple.bind(this);
        this.deleteState=this.deleteState.bind(this);
    }
    modifyState(stateName){
        this.setState(stateName);
    }

    addTuple(){
        let temp=this.state.question;
        temp.push({ "name": "q",
            "tag": ["t","t"],
            "frequent": 0,
            "date":" "},);
        this.setState({question:temp});
    }

    deleteState(index){
        let temp=this.state.question;

        //temp.splice(index,1);
        delete temp[index];
        this.setState({question:temp});
    }
    render(){
        let list=this.state.question.map((item,i) => (
            <Tuple key={i+1} seq={i+1} name={item.name} tag={item.tag} frequency={item.frequent} date={item.date}
                   modify={this.modifyState} delete={this.deleteState}/>

        ));
        return(
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={6}>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>frequency</th>
                                <th>date</th>
                                <th>tag</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                            <Button bsStyle="success" onClick={this.addTuple}>+</Button>
                        </Table>
                    </Col>
                    <Col xs={6} md={6}>
                        <p>heheda</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default MainTable;
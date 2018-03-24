import React, { Component } from 'react';

import {Table} from 'react-bootstrap';
import {Form,FormGroup,FormControl,InputGroup,ControlLabel} from 'react-bootstrap'
import {Label} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Grid,Row,Col} from 'react-bootstrap'
//import App from "./App";
import constantData from './question.json'
import { Redirect } from 'react-router-dom';
import {Modal} from 'react-bootstrap';


let arr=[];

class Cell extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            input:false,
            str:this.props.str
        };
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
            str:e.target.value
        });
    }

    changeIputBlur(){
        this.setState({
            input:false
        });
        if (this.props.cg==="name"){
            this.props.modify("name",this.state.str);
        }
        else if (this.props.cg==="frequency"){
            this.props.modify("frequent",this.state.str);
        }
        else if (this.props.cg==="date"){
            this.props.modify("date",this.state.str);
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
        this.props.modify(this.props.tag,this.state.tag);
        this.tag=this.state.tag;
    }
   render(){
       if (!this.state.input){
           return(<Label bsStyle="info" onClick={this.changeState}>{this.state.tag}</Label>);
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
        this.props.modify("tag",tagG);
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
        this.state={redirect:false};
        this.deleteTuple=this.deleteTuple.bind(this);
        this.modifyTuple=this.modifyTuple.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    deleteTuple(){
        this.props.delete(this.props.seq-1);
    }
    modifyTuple(stateName,stateC){
        this.props.modify(this.props.seq,stateName,stateC);
    }
    handleClick(){
        this.setState({redirect:true});
    }
    render(){
        if (this.state.redirect){
            this.props.update(this.props.keys);
            let ref="/"+this.props.keys;
            return (<Redirect push to={ref} />);
        }
        else {
            if (this.props.show) {
                return (
                    <tr>
                        <td>{this.props.seq}</td>
                        <Cell cg="name" str={this.props.name} modify={this.modifyTuple}/>
                        <Cell cg="frequency" str={this.props.frequency} modify={this.modifyTuple}/>
                        <Cell cg="date" str={this.props.date} modify={this.modifyTuple}/>
                        <TagGroup tag={this.props.tag} modify={this.modifyTuple}/>
                        <Button onClick={this.handleClick}>></Button>
                        <Button bsStyle="danger" onClick={this.deleteTuple}>-</Button>
                    </tr>
                )
            }
            else return (<p></p>)
        }
    }
}


class SortTable extends React.Component{
    constructor(prop){
        super(prop);
        this.state={sort:0};
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        let temp=this.state.sort;
        temp=(temp+1)%3;
        this.setState({sort:temp});
        this.props.sort(this.props.title,temp);
    }
    render(){
        if (this.state.sort===0){return(<th onClick={this.handleClick}>{this.props.title}</th>)}
        else if (this.state.sort===1){return <th onClick={this.handleClick}>{this.props.title}⬆</th>}
        else if (this.state.sort===2){return <th onClick={this.handleClick}>{this.props.title}⬇</th>}
    }
}

function cmpNameDown(a,b){
    if (b["name"] === a["name"]) return 0;
    else if (b["name"] > a["name"]) return 1;
    else return -1;
}

function cmpNameUp(a,b){
    if (b["name"] === a["name"]) return 0;
    else if (b["name"] < a["name"]) return 1;
    else return -1;
}

function cmpFreDown(a,b){
    return b["frequent"]-a["frequent"];
}

function cmpFreUp(a,b){
    return a["frequent"]-b["frequent"];
}

function cmpDateDown(a,b){
    if (b["date"] === a["date"]) return 0;
    else if (b["date"] > a["date"]) return 1;
    else return -1;
}

function cmpDateUp(a,b){
    if (b["date"] === a["date"]) return 0;
    else if (b["date"] < a["date"]) return 1;
    else return -1;
}

class CreateForm extends React.Component{
    constructor(prop){
        super(prop);
        this.name="";
        this.content="";
        this.tagOne="";
        this.tagTwo="";
        this.changeName=this.changeName.bind(this);
        this.changeContent=this.changeContent.bind(this);
        this.changeTag1=this.changeTag1.bind(this);
        this.changeTag2=this.changeTag2.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    changeName(e){
        this.name=e.target.value;
    }

    changeContent(e){
        this.content=e.target.value;
    }

    changeTag1(e){
        this.tagOne=e.target.value;
    }

    changeTag2(e){
        this.tagTwo=e.target.value;
    }

    handleClick(){
        this.props.create(this.name,this.content,this.tagOne,this.tagTwo);
    }

    render(){
        return(
            <Form horizontal>
                <FormGroup>
                    <Col sm={2}><ControlLabel>标题</ControlLabel></Col>
                    <Col sm={10}><FormControl type="text" placeholder="Please enter title" onChange={this.changeName}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2}><ControlLabel>内容</ControlLabel></Col>
                    <Col sm={10}><FormControl type="text" placeholder="Please enter content" onChange={this.changeContent}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2}><ControlLabel>标签1</ControlLabel></Col>
                    <Col sm={10}><FormControl type="text" placeholder="Please enter tag1" onChange={this.changeTag1}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2}><ControlLabel>标签2</ControlLabel></Col>
                    <Col sm={10}><FormControl type="text" placeholder="Please enter tag2" onChange={this.changeTag2}/></Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={10} sm={2}><Button type="submit" onClick={this.handleClick} >创建</Button></Col>
                </FormGroup>
            </Form>
        )

    }
}

class CreateNew extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            showModal:this.props.show
        };
        this.close=this.close.bind(this);
        this.submit=this.submit.bind(this);

    }
    close() {
        this.setState({ showModal: false });
    }

    submit(name,content,tag1,tag2){
        this.props.create(name,content,tag1,tag2);
       // this.setState({ showModal: false });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.show
        });
    }
    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>创建新错题</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <CreateForm create={this.submit} close={this.close}/>
                    </Modal.Body>



                </Modal>
            </div>
        )
    }
}


class MainTable extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            question:constantData.question,
            filter:constantData.filter,
            keyword:"",
            create:false
        };
        this.count=6;
        this.modifyState=this.modifyState.bind(this);
        this.addTuple=this.addTuple.bind(this);
        this.deleteState=this.deleteState.bind(this);
        this.changeContent=this.changeContent.bind(this);
        this.searchFilter=this.searchFilter.bind(this);
        this.sortf=this.sortf.bind(this);
        this.setCreate=this.setCreate.bind(this);
        this.updateLocal=this.updateLocal.bind(this);
    }
    modifyState(index,stateName,stateC){
        let temp=this.state.question;
        temp[index-1][stateName]=stateC;
        this.setState({question:temp});
    }

    updateLocal(key){
        let question=this.state.question;
        let content="";
        let name="";
        let date="";
        for (let i=0;i<question.length;i++){
            if (question[i]["key"] === key){
                content=question[i]["content"];
                name=question[i]["name"];
                date=question[i]["date"];
            }
        }
        localStorage.setItem(key+"c",content);
        localStorage.setItem(key+"n",name);
        localStorage.setItem(key+"d",date);
    }

    setCreate(){
        this.setState({create:true});
    }
    addTuple(name,content,tag1,tag2){
        this.count++;
        let temp=this.state.question;
        temp.push({ "name": name,
            "tag": [tag1,tag2],
            "frequent": 0,
            "date":new Date().toLocaleDateString(),
        "key":"k"+this.count.toString(),
        "content":content});
        let filter=this.state.filter;
        filter.push(true);
        this.setState({question:temp,filter:filter});
    }

    deleteState(index){
        let temp=this.state.question;

        temp.splice(index,1);
        //delete temp[index];
        this.setState({question:temp,create:false});
    }

    searchFilter(v){
        let filter=this.state.filter;
        if (v===""){
            for (let i=0;i<filter.length;i++){
                filter[i]=true;
            }
            this.setState({filter:filter});
            return;
        }
        let temp=this.state.question;
        let str="";
        for (let i=0;i<temp.length;i++){
            str=temp[i].name+temp[i].date;
            for (let j=0;j<temp[i].tag.length;j++){
                str+=temp[i].tag[j];
            }
            if (str.indexOf(v)===-1){filter[i]=false;}
        }
        this.setState({filter:filter});
    }

    changeContent(e){
        this.setState({
            keyword:e.target.value
        });
        this.searchFilter(e.target.value);
    }



    sortf(title,mode){
        if (mode === 0) return;
        let temp=this.state.question;
        if (title === "name"){
            if (mode === 1){
                temp.sort(cmpNameUp);
                this.setState({question:temp});
                this.searchFilter("");
                return;
            }
            else if (mode === 2){
                temp.sort(cmpNameDown);
                this.setState({question:temp});
                this.searchFilter("");
                return;
            }
        }
        else if (title === "frequency"){
            if (mode === 1){
                temp.sort(cmpFreUp);
                this.setState({question:temp});
                this.searchFilter("");
                return;
            }
            else if (mode === 2){
                temp.sort(cmpFreDown);
                this.setState({question:temp});
                this.searchFilter("");
                return;
            }
        }
        else if (title === "date"){
            if (mode === 1){
                temp.sort(cmpDateUp);
                this.setState({question:temp});
                this.searchFilter("");
                return;
            }
            else if (mode === 2){
                temp.sort(cmpDateDown);
                this.setState({question:temp});
                this.searchFilter("");
                return;
            }
        }
    }
    render(){
        let list=this.state.question.map((item,i) => (
            <Tuple key={item.key} keys={item.key} content={item.content} seq={i+1} name={item.name} tag={item.tag} frequency={item.frequent} date={item.date}
                   modify={this.modifyState} delete={this.deleteState} show={this.state.filter[i]} update={this.updateLocal}/>

        ));
        return(
            <Grid>
                <Row>
                    <form>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Button>
                                    <Button>search</Button>
                                </InputGroup.Button>
                                    <FormControl type="text" placeholder="enter key word to search"  onChange={this.changeContent}  />
                            </InputGroup>
                        </FormGroup>
                            </form>
                </Row>
                <Row className="show-grid">
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <SortTable sort={this.sortf} title="name"/>
                                <SortTable sort={this.sortf} title="frequency"/>
                                <SortTable sort={this.sortf} title="date"/>
                                <th>tag</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                            <Button bsStyle="success" onClick={this.setCreate}>+</Button>
                        </Table>
                </Row>
                <Row><CreateNew show={this.state.create} create={this.addTuple}/></Row>
            </Grid>
        );
    }
}

export default MainTable;
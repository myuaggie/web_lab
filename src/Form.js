import React, { Component } from 'react';

import {Table} from 'react-bootstrap';
import {FormGroup,FormControl,InputGroup} from 'react-bootstrap'
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
        this.deleteTuple=this.deleteTuple.bind(this);
        this.modifyTuple=this.modifyTuple.bind(this);
    }

    deleteTuple(){
        this.props.delete(this.props.seq-1);
    }
    modifyTuple(stateName,stateC){
        this.props.modify(this.props.seq,stateName,stateC);
    }
    render(){
        if (this.props.show){
        return(
            <tr>
                <td>{this.props.seq}</td>
                <Cell cg="name" str={this.props.name} modify={this.modifyTuple}/>
                <Cell cg="frequency" str={this.props.frequency} modify={this.modifyTuple}/>
                <Cell cg="date" str={this.props.date} modify={this.modifyTuple}/>
                <TagGroup tag={this.props.tag} modify={this.modifyTuple}/>
                <Button bsStyle="danger" onClick={this.deleteTuple}>-</Button>
            </tr>
        )
        }
        else return(<p></p>)
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

class MainTable extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            question:constantData.question,
            filter:constantData.filter,
            keyword:""
        };
        this.count=6;
        this.modifyState=this.modifyState.bind(this);
        this.addTuple=this.addTuple.bind(this);
        this.deleteState=this.deleteState.bind(this);
        this.changeContent=this.changeContent.bind(this);
        this.searchFilter=this.searchFilter.bind(this);
        this.sortf=this.sortf.bind(this);
    }
    modifyState(index,stateName,stateC){
        let temp=this.state.question;
        temp[index-1][stateName]=stateC;
        this.setState({question:temp});
    }

    addTuple(){
        this.count++;
        let temp=this.state.question;
        temp.push({ "name": "q",
            "tag": ["t","t"],
            "frequent": 0,
            "date":" ",
        "key":"k"+this.count.toString()});
        let filter=this.state.filter;
        filter.push(true);
        this.setState({question:temp,filter:filter});
    }

    deleteState(index){
        let temp=this.state.question;

        temp.splice(index,1);
        //delete temp[index];
        this.setState({question:temp});
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
            <Tuple key={item.key} seq={i+1} name={item.name} tag={item.tag} frequency={item.frequent} date={item.date}
                   modify={this.modifyState} delete={this.deleteState} show={this.state.filter[i]}/>

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
                            <Button bsStyle="success" onClick={this.addTuple}>+</Button>
                        </Table>
                </Row>
            </Grid>
        );
    }
}

export default MainTable;
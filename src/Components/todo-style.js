import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Input, Button, InputGroup, InputGroupAddon,
        ButtonGroup   } from 'reactstrap';

class Todo extends Component{
    state = {
        database:[],
        input:'',
        buttonEdit:false,
        idIndex:''
    }

    initialVal = ()=>{
        let strArray = localStorage.getItem("myTodos");

        if (strArray === null) {
            this.setState(
                { database : []}
            )
        }else{
            this.setState(
                { database : JSON.parse(strArray)}
            )
        }
        this.setState(
            { input:'',
            buttonEdit:false,
            idIndex:''
        }
        )
    }

    //=== by mas alvin adetya
    eventChangeReact= (e) =>{
        this.setState(
            {
                input : e.target.value
            }
        )
        // console.log(this.state.input);
    }

    //=== konvensional
    eventChange = () =>{
        const inputanDOM = document.getElementById("inputan");
        this.setState(
            {
                input : inputanDOM.value
            }
        )
        // console.log(this.state.input);
    }

    eventKeyEnter = ()=>{
        const input = document.getElementById('inputan');
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("savebutton").click();
            }
        });
    }
    handleSave =  () =>{
        const inputanDOM = document.getElementById("inputan");
        let addData = this.state.input;
        let idIndex = this.state.idIndex
        let dataArray = this.state.database
        
        if (addData !== '' && idIndex === '') {
            dataArray.push(addData);
            this.setState(
                { 
                    database:dataArray,
                    input:''
                }
            )
            this.handleLocalStorage();
        }
        inputanDOM.focus();
    }

    handleEditData = (index) =>{
        const inputanDOM = document.getElementById("inputan");
        let singleData = this.state.database[index];

        // alert('handleEdit')
        this.setState(
            { 
                input:singleData,
                idIndex:index,
                buttonEdit:true
            }
        )
        inputanDOM.focus();
    }

    handleSaveEdit = index =>{
        const inputanDOM = document.getElementById("inputan");
        let addData = this.state.input;
        let idIndex = this.state.idIndex;
        let dataArray = this.state.database

        dataArray[idIndex] = addData
            this.setState(
                { 
                    database:dataArray,
                    input:'',
                    idIndex:'',
                    buttonEdit:false,
                }
            )
            this.handleLocalStorage();
            inputanDOM.focus();
        }
    

    handleDelData = index =>{
        let dataArray = this.state.database;

        dataArray.splice(index,1);
        this.setState(
            { 
                database:dataArray
            }
        )
        this.handleLocalStorage();

    }
    handleLocalStorage = ()=>{
        let dataArray = this.state.database
        localStorage.setItem("myTodos",JSON.stringify(dataArray));
    }
    
    componentDidMount(){
        this.initialVal();
        this.eventKeyEnter();
    }
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h1>To Do</h1>
                            <InputGroup>
                                <Input id ='inputan' type='text' onChange = {this.eventChange} value = {this.state.input} placeholder="isikan aktivitasmu lalu enter/klik simpan"/>
                                
                                <InputGroupAddon addonType="append">
                                    {this.state.buttonEdit ? (
                                        <ButtonGroup>
                                            <Button color="secondary" onClick = {() => this.handleSaveEdit(this.state.idIndex)}>Edit</Button>
                                            <Button color="secondary" onClick = {() => this.initialVal()}>Batal</Button>
                                        </ButtonGroup>
                                    ):(
                                        <Button color="secondary" id="savebutton" onClick = {() =>this.handleSave()}>Simpan</Button>
                                    )}
                                </InputGroupAddon>
                            </InputGroup>
                            <ul>
                                {this.state.database.map((dataArray, index) => {
                                    return(
                                            
                                                <ListGroup flush>
                                                    <ListGroupItem key={index}>
                                                        <Container>
                                                            <Row>
                                                                <Col xs="6">{dataArray}</Col>
                                                                <Col xs="2">
                                                                    <Button color="primary" onClick = {() => this.handleDelData(index)}>Hapus</Button>
                                                                </Col>
                                                                <Col xs="2">
                                                                    <Button color="primary" onClick = {() => this.handleEditData(index)}>Edit</Button>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            
                                    );
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Todo;
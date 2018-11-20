import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

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
                document.getElementById("inputan").click();
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
    }
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h1>To Do</h1>
                            <input id ='inputan' type='text' onChange = {this.eventChange} value = {this.state.input} /><br />
                            
                            {this.state.buttonEdit ? (
                                <div>
                                    <button onClick = {() => this.handleSaveEdit(this.state.idIndex)}>Edit</button>
                                    <button onClick = {() => this.initialVal()}>Batal</button>
                                </div>
                            ):(
                                <button id="savebutton" onClick = {() =>this.handleSave()}>Simpan</button>
                            )}
                            
                            <ul>
                                {this.state.database.map((dataArray, index) => {
                                    return(
                                            <div>
                                                <ListGroup>
                                                    <ListGroupItem action key={index}>
                                                        <Container>
                                                            <Row>
                                                                <Col xs="6">{dataArray}</Col>
                                                                <Col xs="6">
                                                                    <button onClick = {() => this.handleDelData(index)}>Hapus</button>
                                                                    <button onClick = {() => this.handleEditData(index)}>Edit</button>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </div> 
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
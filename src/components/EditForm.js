import React from "react";
import {Button, Form, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import url from "../utils/utils"

const EditForm = ({
    setInputTextName, 
    inputTextName, 
    setInputTextEmail, 
    inputTextEmail, 
    setInputTextPhone, 
    inputTextPhone, 
    setInputTextGender, 
    inputTextGender, 
    setContacts, 
    setModalIsOpen,
    contactId}) => {

    const inputTextNameHandler = (e) => {
        setInputTextName(e.target.value);
    };
    const inputTextEmailHandler = (e) => {
        setInputTextEmail(e.target.value);
    };
    const inputTextPhoneHandler = (e) => {
        setInputTextPhone(e.target.value);
    };
    const inputTextGenderHandler = (e) => {
        setInputTextGender(e.target.value);
    };

    const submitContactHandler = (e) => {
        e.preventDefault();
        if(inputTextName === "" || inputTextEmail === "" || inputTextPhone === "" || inputTextGender === "" ) {
            alert("Please fill in all fields!")
        } else {
            let formData = {
                name: inputTextName,
                phone: inputTextPhone,
                email: inputTextEmail,
                gender: inputTextGender
            }
            
            axios.put(url+`${contactId}`, formData)
                .then(response => {
                    console.log(response);
                    axios.get(url)
                        .then(res => {
                        const users = res.data;
                        setContacts(users.data);
                        console.log(users.data);
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            
            setInputTextName("");
            setInputTextEmail("");
            setInputTextPhone("");
            setModalIsOpen(false);
        }
        
    };

    const cancelEditHandler = () =>{
        setModalIsOpen(false);
    }


    return(
        <Card className="mb-3">
            <Card.Body>
            <Form
            id='myForm'
            className="form">
                
                <Form.Group className="mb-3" controlId="formBasicName" value={inputTextName} onChange={inputTextNameHandler}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={inputTextName} onChange={inputTextNameHandler}/>
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="formBasicEmail" value={inputTextEmail} onChange={inputTextEmailHandler}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={inputTextEmail} onChange={inputTextEmailHandler}/>
                </Form.Group>
            
                <Form.Group  className="mb-3" controlId="formBasicPhone" value={inputTextPhone} onChange={inputTextPhoneHandler}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Enter phone number" value={inputTextPhone} onChange={inputTextPhoneHandler}/>
                </Form.Group>

            
                <div key={`inline-default-radio`} onChange={inputTextGenderHandler} className="mb-3">
                <Form.Check 
                    inline
                    type='radio'
                    name='gender'
                    value='Male'
                    id={`inline-default-radio`}
                    label='Male'
                />

                <Form.Check
                    inline
                    type='radio'
                    name='gender'
                    value='Female'
                    label='Female'
                    id={`inline-default-radio`}
                />
                </div>
                <div className="d-grid gap-2">
                    <Button variant="primary" size='lg' onClick={submitContactHandler} type="submit">Edit</Button>
                    <Button variant="outline-primary" size='lg' onClick={cancelEditHandler} type="submit">Cancel</Button>
                </div>
            
        </Form>
            </Card.Body>
        </Card>
    );
};

export default EditForm;
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Services/axio";
import { Container, Row, Col, Card } from 'react-bootstrap'

import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill, BsTextRight, BsPauseFill } from "react-icons/bs";
import '../css/addUser.css'
import Logout from './Logout';

function Register() {

    const [passwordError, setpasswordError] = useState("");
    const [logError, setlogError] = useState("");
    const [emailError, setemailError] = useState("");
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [unameError, setunameError] = useState('');
    const [contactError, setcontactError] = useState('');
    const [nicError, setNicError] = useState('');

    const [showLogout, setShowLogout] = useState(false);

    const [fname, setfname] = useState('');
    const [nic, setnic] = useState('');
    const [lname, setlname] = useState('');
    const [uname, setuname] = useState('');
    const [email, setemail] = useState('');
    const [contact, setcontact] = useState('');
    const [pass, setpassword] = useState('');
    const [conPass, setConPassword] = useState('');


    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid = true;
        if (fname === "") {
            setfnameError("please enter first name");
            formIsValid = false;
        } else {
            setfnameError("");
            formIsValid = true;

        }

        if (lname === "") {
            setlnameError("please enter last name");
            formIsValid = false;
        } else {
            setlnameError("");
            formIsValid = true;

        }

        if (uname === "") {
            setunameError("please enter user name");
            formIsValid = false;
        } else {
            setunameError("");
            formIsValid = true;

        }

        if (nic === "") {
            setNicError("please enter NIC");
            formIsValid = false;
        } else {
            setNicError("");
            formIsValid = true;

        }

        if (!contact.match(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/)) {
            setcontactError("please enter valid number!");
            formIsValid = false;

        } else {
            setcontactError("");
            formIsValid = true;

        }

        if (email === "") {
            setemailError("please enter valid email");
            return false;
        }
        else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            formIsValid = true;
        }

        if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
            formIsValid = false;
            setpasswordError("Please enter length must best min 6 Chracters and Max 12 Chracters");
            return false;
        } else {
            if (pass === conPass) {
                setpasswordError("");
                formIsValid = true;
            } else {
                setpasswordError("Passwords do not match!");
                formIsValid = false;
            }
        }

        return formIsValid;
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (handleValidation() === true) {
            var token = sessionStorage.getItem("token");

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

            const dataObject = {
                firstName: fname,
                lastName: lname,
                userName: uname,
                nic: nic,
                email: email,
                contactNumber: contact,
                password: pass,
                userRole: ""

            };

            axios.post('/user/create-user', dataObject,
                {
                    headers: headers
                })
                .then((res) => {

                    if (res.data.status === true) {

                        toast.success('user create successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/show-all-users');

                    } else {

                        toast.warn('please enter valid details', { position: toast.POSITION.TOP_RIGHT })
                    }

                }
                ).catch((error) => {
                    if (error.response.data.error) {

                        if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

                            setShowLogout(true);
                        }

                    }
                })

        }

    }

    return (
        <>
            <Header />
            <Row className="">
                <div className="navigation">
                    <Row>
                        <Col lg={2} md={3} sm={3}></Col>
                        <Col lg={10} md={3} sm={3}><b><BsPersonLinesFill></BsPersonLinesFill> Add User</b></Col>
                    </Row>
                </div>
                <Slider />
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">
                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                    <Form.Label >First Name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setfname(e.target.value)} type="text" placeholder="Enter first name" />
                                </Form.Group>
                                <small id="emailHelp" className="text-danger form-text">
                                    {fnameError}
                                </small>

                                <Form.Group controlId="formBasicLastName" className="mt-3">
                                    <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setlname(e.target.value)} type="text" placeholder="Enter last name" />
                                </Form.Group>
                                <small id="emailHelp" className="text-danger form-text">
                                    {lnameError}
                                </small>

                                <Form.Group controlId="formBasicUserName" className="mt-3">
                                    <Form.Label>User Name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setuname(e.target.value)} type="text" placeholder="User name" />
                                </Form.Group>

                                <small id="emailHelp" className="text-danger form-text">
                                    {unameError}
                                </small>

                                <Form.Group controlId="formBasicUserName" className="mt-3">
                                    <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setnic(e.target.value)} type="text" placeholder="NIC" />
                                </Form.Group>

                                <small id="emailHelp" className="text-danger form-text">
                                    {nicError}
                                </small>

                                <Form.Group controlId="formBasicEmail" className="mt-3">
                                    <Form.Label>Email address<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setemail(e.target.value)} type="email" placeholder="Enter email" />
                                </Form.Group>
                                <small id="emailHelp" className="text-danger form-text">
                                    {emailError}
                                </small>

                                <Form.Group controlId="formBasicNumber" className="mt-3">
                                    <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setcontact(e.target.value)} type="text" placeholder="Enter Contact Number" />
                                </Form.Group>
                                <small id="emailHelp" className="text-danger form-text">
                                    {contactError}
                                </small>

                                <Form.Group controlId="formBasicPassword" className="mt-3">
                                    <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setpassword(e.target.value)} type="password" placeholder="Password" />
                                </Form.Group>

                                <Form.Group controlId="formBasicConfPassword" className="mt-3">
                                    <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setConPassword(e.target.value)} type="password" placeholder="Password" />
                                </Form.Group>


                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>

                                <Col className="text-end mt-5">
                                    <Link className="edit-link" path="/show-all-users"
                                        to="/show-all-users">
                                        <Button className="editBtn" variant="info" >Back</Button>
                                    </Link>{' '}
                                    <Link className="edit-link" path="/show-all-users"
                                        to="/show-all-users">
                                        <Button className="editBtn" variant="danger"> Cancel</Button>
                                    </Link>{' '}
                                    <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                                        Save
                                    </Button>

                                </Col>
                            </Form>

                            <ToastContainer />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Footer />

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>
    );
}

export default Register
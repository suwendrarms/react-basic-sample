import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from 'react'
import { Col, Row, Table, Container, Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import axios from "../Services/axio";
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/userList.css'
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill } from "react-icons/bs";
{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}
var _ = require('lodash');

function ShowUsers() {

    const [nextStatus, setnextStatus] = useState(true);
    const [preStatus, setpretStatus] = useState(true);

    const [clients, setclients] = useState([]);
    const [pagenum, setpagenum] = useState(0);
    const [pageNumArr, setpageNumArr] = useState([]);
    const testArr = [];
    const [showLogout, setShowLogout] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    let history = useNavigate();
    var limit = "20";

    const reqBody = {
        page: "0",
        limit: limit,
        search:searchVal
    };

    React.useEffect(() => {
        axios.post('/client/get-client-list', reqBody)
            .then(res => {
                setclients(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }

                }
                sessionStorage.setItem("clientPageNo", 0);
                setpageNumArr(testArr);
            })
            .catch((error) => {
                if (error.response.data.error) {

                    if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                        setShowLogout(true);
                    }

                }
            })
    }, []);

    function setpageclick(id) {
        sessionStorage.setItem("clientPageNo", id);
        const reqBody = {
            page: id,
            limit: limit,
        };

        axios.post('/client/get-client-list', reqBody)
            .then(res => {
                setclients(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }
                }
                setpageNumArr(testArr);
            })
            .catch((error) => {
                if (error.response.data.error) {

                    if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                        setShowLogout(true);
                    }

                }
            })
    }

    function validateForm() {
        return true;
    }

    function setpageNextclick() {
        var id = sessionStorage.getItem("clientPageNo");

        if (parseInt(id) + 1 < pageNumArr.length) {
            sessionStorage.setItem("clientPageNo", parseInt(id) + 1);
            setnextStatus(true);
            const reqBody = {
                page: parseInt(id) + 1,
                limit: limit,
            };

            axios.post('/client/get-client-list', reqBody)
                .then(res => {
                    setclients(res.data.dataSet);
                    setpagenum(res.data.numberOfPages);
                    for (let index = 0; index < res.data.numberOfPages; index++) {
                        //const element = array[index];
                        if (testArr.length < res.data.numberOfPages) {
                            testArr.push(index)
                        }

                    }
                    setpageNumArr(testArr);
                })
                .catch((error) => {
                    if (error.response.data.error) {

                        if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                            setShowLogout(true);
                        }

                    }
                })

        } else {

            validateForm();
            setnextStatus(false);

        }

    }

    function setpagePreclick() {
        var id = sessionStorage.getItem("clientPageNo");

        if (parseInt(id) - 1 >= 0) {
            sessionStorage.setItem("clientPageNo", parseInt(id) - 1);
            setpretStatus(true);
            const reqBody = {
                page: parseInt(id) - 1,
                limit: limit,
            };

            axios.post('/client/get-client-list', reqBody)
                .then(res => {
                    setclients(res.data.dataSet);
                    setpagenum(res.data.numberOfPages);
                    for (let index = 0; index < res.data.numberOfPages; index++) {
                        //const element = array[index];
                        if (testArr.length < res.data.numberOfPages) {
                            testArr.push(index)
                        }

                    }
                    setpageNumArr(testArr);
                })
                .catch((error) => {
                    if (error.response.data.error) {

                        if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                            setShowLogout(true);
                        }

                    }
                })

        } else {
            setpretStatus(false);
        }

    }

    const handelSubmitSearch = (e) => {
        e.preventDefault();

        axios.post('/client/get-client-list', reqBody)
        .then(res => {
            setclients(res.data.dataSet);
            setpagenum(res.data.numberOfPages);
            for (let index = 0; index < res.data.numberOfPages; index++) {
                //const element = array[index];
                if (testArr.length < res.data.numberOfPages) {
                    testArr.push(index)
                }

            }
            sessionStorage.setItem("clientPageNo", 0);
            setpageNumArr(testArr);
        })
        .catch((error) => {
            if (error.response.data.error) {

                if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                    setShowLogout(true);
                }

            }
        })

    }


    return (
        <>
            <Header />

            <div className="navigation">
                <Row>
                    <Col lg={2} md={3} sm={3}></Col>
                    <Col lg={10} md={3} sm={3}><b><BsPersonLinesFill></BsPersonLinesFill> Client List</b></Col>
                </Row>
            </div>
            <Row className="">
                <Slider />
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">

                    <Row>
                        {/* <Form> */}
                        <Col lg={6} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Control type="test" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} className="mt-3">
                            <Button onClick={e => handelSubmitSearch(e)} variant="success btn-block" type="submit" className="">
                                Search
                            </Button>
                        </Col>

                        <Col lg={2} md={4} className="mt-3">
                            <Link to={'/client'} >
                                <Button variant="success" className="mr-auto"><BsPersonPlusFill></BsPersonPlusFill> Add new</Button>{' '}
                            </Link>
                        </Col>
                        {/* </Form> */}
                    </Row>

                    <br></br>
                    <br></br>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact Number 1</th>
                                <th>Contact Number 2</th>
                                <th>NIC</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {clients.length > 0?clients.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.contactNumber}</td>
                                        <td>{item.contactNumber2 ? item.contactNumber2 : 'N/A'}</td>
                                        <td>{item.nic}</td>

                                        <td>
                                            <Link className="edit-link" path={"client-edit/:id"}
                                                to={'/client-edit/' + item._id}>
                                                <Button className="editBtn" variant="info" size="md"><i class="fa fa-edit"></i> Edit</Button>
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            }):<tr className="text-center"><td colSpan={6} >Data Not Found!</td></tr>}
                        </tbody>
                    </Table>
                    <ButtonToolbar
                        className="justify-content-between"
                        aria-label="Toolbar with Button groups"
                    >
                        <ButtonGroup aria-label="First group" className="btn-page">
                            <Button onClick={e => setpagePreclick()} variant="info" className={sessionStorage.getItem("clientPageNo") == 0 ? "disabled" : ""}>Previous</Button>{' '}
                            {pageNumArr.map((item) => {
                                return (
                                    <>
                                        <Button onClick={e => setpageclick(item)} className={sessionStorage.getItem("clientPageNo") == item ? "active" : ""} variant="info">{item + 1}</Button>{' '}
                                    </>
                                )
                            })}
                            <Button onClick={e => setpageNextclick()} variant="info" className={parseInt(sessionStorage.getItem("clientPageNo")) == pageNumArr.length - 1 ? "disabled" : ""}>Next</Button>{' '}
                        </ButtonGroup>
                    </ButtonToolbar>
                    <ToastContainer />
                </Col>
            </Row>
            <Footer />

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>

    );
}

export default ShowUsers
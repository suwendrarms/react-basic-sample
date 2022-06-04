import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from 'react'

import { Col, Row, Table, Button, Modal, Form, ButtonGroup, Badge } from "react-bootstrap";
import axios from "../Services/axio";
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/userList.css'
import LogoutModel from './LogoutModel';

import { BsPersonLinesFill } from "react-icons/bs";
var moment = require('moment');

function CallList() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showLogout, setShowLogout] = useState(false);
    var limit =20;

    const handleChangeClose = () => setChangeShow(false);
    const [showCofirm, setChangeShow] = useState(false);

    const [nextStatus, setnextStatus] = useState(true);
    const [preStatus, setpretStatus] = useState(true);

    const [callType, setCallType] = useState('');

    const [user_id, setUserId] = useState('');
    const [user, setUser] = useState({});
    const [agent, setAgent] = useState({});
    const [call, setCall] = useState({});
    const [filterUserId, setFiterUserId] = useState('');
    const [status , setStatus]=useState('')

    const [users, setusers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [pagenum, setpagenum] = useState(0);
    const [pageNumArr, setpageNumArr] = useState([]);
    const testArr = [];

    let history = useNavigate();

    const reqBody = {
        page: "0",
        limit: limit,
        type: "",
        userId: ''
    };

    React.useEffect(() => {
        axios.post('/call/get-call-list', reqBody
        )
            .then(res => {
                setusers(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }

                }
                sessionStorage.setItem("CallListPageNo", 0);
                setpageNumArr(testArr);
            })
            .catch((error) => {
                if(error.response.data.error){
                        
                    if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

                        setShowLogout(true);
                    }

                }
            })
    }, []);

    React.useEffect(() => {
        axios.get('/user/get-active-users'
        )
            .then(res => {
                setActiveUsers(res.data.dataSet)
            })
            .catch((error) => {
                if(error.response.data.error){
                        
                    if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

                        setShowLogout(true);
                    }

                }
            })
    }, []);

    function setpageclick(id) {
        sessionStorage.setItem("CallListPageNo", id);
        const reqBody = {
            page: id,
            limit: limit,
            type: callType,
            userId: ''
        };

        axios.post('/call/get-call-list', reqBody)
            .then(res => {
                setusers(res.data.dataSet);
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
                if(error.response.data.error){
                        
                    if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

                        setShowLogout(true);
                    }

                }
            })
    }

    function validateForm() {
        return true;
    }

    function setpageNextclick() {
        var id = sessionStorage.getItem("CallListPageNo");

        if (parseInt(id) + 1 < pageNumArr.length) {
            sessionStorage.setItem("CallListPageNo", parseInt(id) + 1);
            setnextStatus(true);
            const reqBody = {
                page: parseInt(id) + 1,
                limit: limit,
                type: callType,
                userId: ''
            };

            axios.post('/call/get-call-list', reqBody)
                .then(res => {
                    setusers(res.data.dataSet);
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
                    if(error.response.data.error){
                        
                        if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

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
        var id = sessionStorage.getItem("CallListPageNo");

        if (parseInt(id) - 1 >= 0) {
            sessionStorage.setItem("CallListPageNo", parseInt(id) - 1);
            setpretStatus(true);
            const reqBody = {
                page: parseInt(id) - 1,
                limit: limit,
                type: callType,
                userId: ''
            };

            axios.post('/call/get-call-list', reqBody)
                .then(res => {
                    setusers(res.data.dataSet);
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
                    if(error.response.data.error){
                        
                        if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

                            setShowLogout(true);
                        }

                    }
                })

        } else {
            setpretStatus(false);
        }

    }



    function openModel(id) {
        handleShow();
        setUserId(id);

        const dataObject = {
            id: id
        };

        axios.post('/call/get-call-details', dataObject)
            .then((res) => {
                if (res.data.status === true) {
                    setAgent(res.data.dataSet.calledAgent)
                    setUser(res.data.dataSet.callUserID)
                    setCall(res.data.dataSet)
                    setUserId('');

                }

            }).catch((error) => {
                if(error.response.data.error){
                        
                    if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

                        setShowLogout(true);
                    }

                }
            })
    }

    function filterCallType(val) {

        setCallType(val);

        const reqBody = {
            page: "0",
            limit: limit,
            type: val,
            userId: ''
        };

        axios.post('/call/get-call-list', reqBody)
            .then(res => {
                setusers(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }

                }
                sessionStorage.setItem("CallListPageNo", 0);
                setpageNumArr(testArr);
            })
            .catch((error) => {
                if(error.response.data.error){
                        
                    if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

                        setShowLogout(true);
                    }

                }
            })

    }

    const handelSubmit = (e) => {
        e.preventDefault();

        const dataObject = {
            page: 0,
            limit: limit,
            type: callType,
            userId: filterUserId,
            status:status
        };
        axios.post('/call/get-call-list', dataObject)
            .then(res => {
                setusers(res.data.dataSet);
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
                if(error.response.data.error){
                        
                    if(error.response.data.error.message==="invalid token" ||error.response.data.error.message==="jwt expired"){

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
                    <Col lg={10} md={3} sm={3}><b><BsPersonLinesFill></BsPersonLinesFill>Call List</b></Col>
                </Row>
            </div>
            <Row className="">
                <Slider />
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">
                    <Row>
                        {/* <Form> */}
                        <Col lg={3} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Label>Call Type</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={e => setCallType(e.target.value)}>
                                    <option value="">All Types</option>
                                    <option value="0">Pending</option>
                                    <option value="1">Incoming</option>
                                    <option value="2">Outgoing</option>
                                    <option value="3">Missed</option>
                                    <option value="4">Rejected</option>
                                    <option value="5">Not picked by client</option>

                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={3} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Label>Select Agent</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={e => setFiterUserId(e.target.value)}>
                                    <option value="">All Agent</option>
                                    {activeUsers.map((item) => {
                                        return (

                                            <>
                                                <option value={item._id}>{item.firstName} {item.lastName}</option>
                                            </>
                                        )
                                    })}

                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={3} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
                                    <option value="">All</option>
                                    <option value="1">Completed</option>
                                    <option value="0">Incompleted</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={3} md={4} className="mt-5">
                            <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                                Search
                            </Button>
                        </Col>
                        {/* </Form> */}
                    </Row>
                    <br></br>
                    <br></br>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Phone Number</th>
                                <th>Created Date</th>
                                <th>Call Type</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0?users.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.calledNumber}</td>
                                        <td>{moment(item.createdAt).format('lll')}</td>
                                        <td>
                                            {item.calledType == 0?<Badge bg="info">Pending</Badge>:item.calledType == 1 ? <Badge bg="primary">Incoming</Badge> : item.calledType == 2 ?
                                                <Badge bg="secondary">Outgoing</Badge> : item.calledType == 3 ?
                                                    <Badge bg="warning">Missed</Badge> : item.calledType == 4 ? <Badge bg="danger">Rejected</Badge> : <Badge bg="dark">Not picked by client</Badge>

                                            }
                                        </td>
                                        <td>
                                            {item.status == 1?<Badge bg="info">Completed</Badge>:<Badge bg="dark">Incompleted</Badge>}
                                        </td>
                                        <td>
                                            <Button variant="info" onClick={e => openModel(item._id)}>
                                                show
                                            </Button>
                                        </td>

                                    </tr>
                                )
                            }): <tr className="text-center"><td colSpan={5} >Data Not Found!</td></tr>}
                        </tbody>
                    </Table>
                    <ButtonToolbar
                        className="justify-content-between"
                        aria-label="Toolbar with Button groups"
                    >
                        <ButtonGroup aria-label="First group" className="btn-page">
                            <Button onClick={e => setpagePreclick()} variant="info" className={sessionStorage.getItem("CallListPageNo") == 0 ? "disabled" : ""}>Previous</Button>{' '}
                            {pageNumArr.map((item) => {
                                return (
                                    <>
                                        <Button onClick={e => setpageclick(item)} className={sessionStorage.getItem("CallListPageNo") == item ? "active" : ""} variant="info">{item + 1}</Button>{' '}
                                    </>
                                )
                            })}
                            <Button onClick={e => setpageNextclick()} variant="info" className={parseInt(sessionStorage.getItem("CallListPageNo")) == pageNumArr.length - 1 ? "disabled" : ""}>Next</Button>{' '}
                        </ButtonGroup>
                    </ButtonToolbar>
                    <ToastContainer />
                </Col>
            </Row>
            <Footer />

            <Modal show={show} onHide={handleClose} animation={false} >
                {/* <Modal.Header>
                    <Modal.Title>Call Details</Modal.Title>
                </Modal.Header> */}
                <Form enctype="multipart/form-data">
                    <Modal.Body className="p-3">
                        <Row>
                            <h6>Call Details</h6><hr></hr>
                            <Col lg={6} md={6}>
                                <Form.Label>Called Number</Form.Label>
                                <h6>{call?call.calledNumber:""}</h6>
                            </Col>
                            <Col lg={6} md={4}>
                                <Form.Label>Duration</Form.Label>
                                <h6>{call?call.calledDuration:""}</h6>
                            </Col>
                            <Col lg={6} md={4} className="p-3">
                                <Form.Label>Call Type</Form.Label>
                                {call.calledType == 0?<Badge bg="info">Pending</Badge>:call.calledType == 1 ? <h6><Badge bg="primary">Incoming</Badge></h6> : call.calledType == 2 ?
                                    <h6><Badge bg="secondary">Outgoing</Badge></h6> : call.calledType == 3 ?
                                        <h6><Badge bg="warning">Missed</Badge></h6> : call.calledType == 4 ? <h6><Badge bg="danger">Rejected</Badge></h6> : <h6><Badge bg="dark">Not picked by client</Badge></h6>

                                }                   
                            </Col>
                            <Col lg={6} md={4} className="p-3">
                                <Form.Label>Date</Form.Label>
                                <h6>{moment(call?call.calledDate:"").format('L')}</h6>
                            </Col>
                        </Row>
                        <br></br><br></br>
                        <Row>
                            <h6>Client Details</h6><hr></hr>
                            {/* <Col lg={6} md={6}>
                                <Form.Label>Contact Number</Form.Label>
                                <h6>{user.contactNumber}</h6>
                            </Col> */}
                            <Col lg={6} md={4}>
                                <Form.Label>Name</Form.Label>
                                <h6>{user?user.name:""}</h6>
                            </Col>
                        </Row>
                        <br></br><br></br>
                        <Row>
                            <h6>Agent Details</h6><hr></hr>
                            {/* <Col lg={6} md={6}>
                                <Form.Label>Contact Number</Form.Label>
                                <h6>{agent.contactNumber}</h6>
                            </Col> */}
                            <Col lg={6} md={5}>
                                <Form.Label>User Name</Form.Label>
                                <h6>{agent?agent.userName:""}</h6>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>

    );
}

export default CallList
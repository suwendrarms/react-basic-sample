import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from 'react'
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
import CSVReader from 'react-csv-reader';
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill } from "react-icons/bs";
var _ = require('lodash');

function ShowUsers() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeClose = () => setChangeShow(false);
    const [showCofirm, setChangeShow] = useState(false);
    const handleChangeShow = () => setChangeShow(true);

    const [checked, setChecked] = useState(false);
    const [nextStatus, setnextStatus] = useState(true);
    const [preStatus, setpretStatus] = useState(true);

    const [contact, setcontact] = useState('');
    const [filename, setFile] = useState([]);
    const [userConfirmId, setUserConfirmId] = useState('');
    const [userChangeStatus, setChangeStatus] = useState('');

    const [fileError, setnameError] = useState('');
    const [contactError, setcontactError] = useState('');
    const [searchVal, setSearchVal] = useState('');

    const [user_id, setUserId] = useState('');
    const [showLogout, setShowLogout] = useState(false);

    const [users, setusers] = useState([]);
    const [pagenum, setpagenum] = useState(0);
    const [pageNumArr, setpageNumArr] = useState([]);
    const testArr = [];

    let history = useNavigate();
    var limit = "20";

    const reqBody = {
        page: "0",
        limit: limit,
        search: searchVal
    };

    React.useEffect(() => {
        axios.post('/user/get-users', reqBody)
            .then(res => {
                setusers(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }

                }
                sessionStorage.setItem("pageno", 0);
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
        sessionStorage.setItem("pageno", id);
        const reqBody = {
            page: id,
            limit: limit,
        };

        axios.post('/user/get-users', reqBody)
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
        var id = sessionStorage.getItem("pageno");

        if (parseInt(id) + 1 < pageNumArr.length) {
            sessionStorage.setItem("pageno", parseInt(id) + 1);
            setnextStatus(true);
            const reqBody = {
                page: parseInt(id) + 1,
                limit: limit,
            };

            axios.post('/user/get-users', reqBody)
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
        var id = sessionStorage.getItem("pageno");

        if (parseInt(id) - 1 >= 0) {
            sessionStorage.setItem("pageno", parseInt(id) - 1);
            setpretStatus(true);
            const reqBody = {
                page: parseInt(id) - 1,
                limit: limit,
            };

            axios.post('/user/get-users', reqBody)
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


    function changeStatus() {

        const dataBody = {
            id: userConfirmId,
            status: userChangeStatus

        };

        axios.post('/user/user-status-change', dataBody)
            .then((res) => {
                if (res.data.status === true) {

                    var index = _.findIndex(users, { '_id': res.data.id });
                    if (index >= 0) {
                        users[index].status = userChangeStatus;
                    }

                    setusers(users);
                    setUserConfirmId('');
                    setChangeStatus('');
                    handleChangeClose();
                    toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

                } else {
                    handleChangeClose();
                    toast.warn('try again', { position: toast.POSITION.TOP_RIGHT })
                }

            }).catch((error) => {
                if (error.response.data.error) {

                    if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

                        setShowLogout(true);
                    }

                }
            })

    }

    function openModel(id) {
        handleShow();
        setUserId(id);
    }

    function changeStatusModel(id, status) {
        handleChangeShow();
        setUserConfirmId(id);
        setChangeStatus(status);
    }

    const handleValidation = (event) => {
        let formIsValid = true;

        if (filename.length === 0) {
            setnameError("please upload file");
            formIsValid = false;
        } else {
            setnameError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        handleValidation();

        if (handleValidation() === true) {

            const dataObject = {
                file: filename,
                userId: user_id

            };


            axios.post('/call/upload-csv', dataObject)
                .then((res) => {
                    if (res.data.status === true) {

                        handleClose();
                        toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
                        setUserId('');
                        setFile([]);
                    } else {
                        toast.warn(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                    }

                }).catch((error) => {
                    if (error.response.data.error) {

                        if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

                            setShowLogout(true);
                        }

                    }
                })
        }
    }

    const handleForce = (data, fileInfo) => {
        setFile(data)
        setnameError("");
    };

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    const handelSubmitSearch = (e) => {
        e.preventDefault();

        axios.post('/user/get-users', reqBody)
            .then(res => {
                setusers(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }

                }
                sessionStorage.setItem("pageno", 0);
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

    const handleCloseCsv = () => {
        setnameError('')
        setFile([]);
        handleClose()

    }


    return (
        <>
            <Header />

            <div className="navigation">
                <Row>
                    <Col lg={2} md={3} sm={3}></Col>
                    <Col lg={10} md={3} sm={3}><b><BsPersonLinesFill></BsPersonLinesFill> Users List</b></Col>
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
                            <Link to={'/create-user'} >
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
                                <th>first Name</th>
                                <th>last Name</th>
                                <th>user Name</th>
                                <th>NIC</th>
                                <th>email</th>
                                <th>Contact Number</th>
                                <th>Activate</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.nic}</td>
                                        <td>{item.email}</td>
                                        <td>{item.contactNumber}</td>
                                        <td>
                                            {item.status == 0 ? <Button onClick={e => changeStatusModel(item._id, 1)}
                                                variant="success">Activate </Button> : <Button onClick={e => changeStatusModel(item._id, 0)}
                                                    variant="danger">Deactivate </Button>}

                                        </td>
                                        <td>
                                            <Link className="edit-link" path={"user-edit/:id"}
                                                to={'/user-edit/' + item._id}>
                                                <Button className="editBtn" variant="info" size="md"><i class="fa fa-edit"></i> Edit</Button>
                                            </Link>
                                            {' '}
                                            <Button variant="info" onClick={e => openModel(item._id)}>
                                                Assign Calls
                                            </Button>
                                        </td>


                                    </tr>
                                )
                            }) : <tr className="text-center"><td colSpan={8} >Data Not Found!</td></tr>}
                        </tbody>
                    </Table>
                    <ButtonToolbar
                        className="justify-content-between"
                        aria-label="Toolbar with Button groups"
                    >
                        <ButtonGroup aria-label="First group" className="btn-page">
                            <Button onClick={e => setpagePreclick()} variant="info" className={sessionStorage.getItem("pageno") == 0 ? "disabled" : ""}>Previous</Button>{' '}
                            {pageNumArr.map((item) => {
                                return (
                                    <>
                                        <Button onClick={e => setpageclick(item)} className={sessionStorage.getItem("pageno") == item ? "active" : ""} variant="info">{item + 1}</Button>{' '}
                                    </>
                                )
                            })}
                            <Button onClick={e => setpageNextclick()} variant="info" className={parseInt(sessionStorage.getItem("pageno")) == pageNumArr.length - 1 ? "disabled" : ""}>Next</Button>{' '}
                        </ButtonGroup>
                    </ButtonToolbar>
                    <ToastContainer />
                </Col>
            </Row>
            <Footer />

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Call Assign</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e => handelSubmit(e)} enctype="multipart/form-data">
                    <Modal.Body>

                        <CSVReader
                            cssClass="react-csv-input"
                            label="Select CSV"
                            onFileLoaded={handleForce}
                            parserOptions={papaparseOptions}
                        />

                        <small id="passworderror" className="text-danger form-text">
                            {fileError}
                        </small>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={e => handleCloseCsv(e)}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showCofirm} onHide={handleChangeClose} animation={false}>

                <Form>
                    <Modal.Body>
                        <h5>Are you sure want to change this</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleChangeClose}>
                            No
                        </Button>
                        <Button variant="success" onClick={e => changeStatus(e)}>
                            yes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>

    );
}

export default ShowUsers
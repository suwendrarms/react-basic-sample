import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from 'react'
import { Col, Row, Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "../Services/axio";
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/userList.css'
import { BsListUl, BsPersonPlusFill, } from "react-icons/bs";
import LogoutModel from './LogoutModel';



function ShowAllRoles() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [checked, setChecked] = useState(false);
    const [nextStatus, setnextStatus] = useState(true);
    const [preStatus, setpretStatus] = useState(true);

    const [users, setusers] = useState([]);
    const [pagenum, setpagenum] = useState(0);
    const [pageNumArr, setpageNumArr] = useState([]);
    const testArr = [];

    const [showLogout, setShowLogout] = useState(false);

    let history = useNavigate();
    var limit = "20";

    const reqBody = {
        page: "0",
        limit: limit,
    };

    React.useEffect(() => {
        axios.post('/user/get-user-role-list', reqBody)
            .then(res => {
                setusers(res.data.dataSet);
                setpagenum(res.data.numberOfPages);
                for (let index = 0; index < res.data.numberOfPages; index++) {
                    //const element = array[index];
                    if (testArr.length < res.data.numberOfPages) {
                        testArr.push(index)
                    }

                }
                sessionStorage.setItem("RolePageNo", 0);
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
        sessionStorage.setItem("RolePageNo", id);
        const reqBody = {
            page: id,
            limit: limit,
        };

        axios.post('/user/get-user-role-list', reqBody)
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
        var id = sessionStorage.getItem("RolePageNo");

        if (parseInt(id) + 1 < pageNumArr.length) {
            sessionStorage.setItem("RolePageNo", parseInt(id) + 1);
            setnextStatus(true);
            const reqBody = {
                page: parseInt(id) + 1,
                limit: limit,
            };

            axios.post('/user/get-user-role-list', reqBody)
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
        var id = sessionStorage.getItem("RolePageNo");

        if (parseInt(id) - 1 >= 0) {
            sessionStorage.setItem("RolePageNo", parseInt(id) - 1);
            setpretStatus(true);
            const reqBody = {
                page: parseInt(id) - 1,
                limit: limit,
            };

            axios.post('/user/get-user-role-list', reqBody)
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


    return (
        <>
            <Header />

            <div className="navigation">
                <Row>
                    <Col lg={2} md={3} sm={3}></Col>
                    <Col lg={10} md={3} sm={3}><b><BsListUl></BsListUl> Role List</b></Col>
                </Row>
            </div>
            <Row className="">
                <Slider />
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">
                    <Link to={'/create-user-role'} >
                        <Button variant="success" className="mr-auto"><BsPersonPlusFill></BsPersonPlusFill> Add new</Button>{' '}
                    </Link>

                    <br></br>
                    <br></br>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <ButtonToolbar
                        className="justify-content-between"
                        aria-label="Toolbar with Button groups"
                    >
                        <ButtonGroup aria-label="First group" className="btn-page">
                            <Button onClick={e => setpagePreclick()} variant="info" className={sessionStorage.getItem("RolePageNo") == 0 ? "disabled" : ""}>Previous</Button>{' '}
                            {pageNumArr.map((item) => {
                                return (
                                    <>
                                        <Button onClick={e => setpageclick(item)} className={sessionStorage.getItem("RolePageNo") == item ? "active" : ""} variant="info">{item + 1}</Button>{' '}
                                    </>
                                )
                            })}
                            <Button onClick={e => setpageNextclick()} variant="info" className={parseInt(sessionStorage.getItem("RolePageNo")) == pageNumArr.length - 1 ? "disabled" : ""}>Next</Button>{' '}
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

export default ShowAllRoles
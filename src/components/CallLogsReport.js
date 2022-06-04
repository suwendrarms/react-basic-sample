import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from 'react'

import { Col, Row, Table, Container, Card, Button, Modal, Form, ButtonGroup, Badge } from "react-bootstrap";
import axios from "../Services/axio";
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/userList.css'
import CSVReader from 'react-csv-reader'
import { CSVLink, CSVDownload } from "react-csv";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import ReactLoading from 'react-loading';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill } from "react-icons/bs";

var moment = require('moment');

function CallLogsReport() {

    const [show, setShow] = useState(false);
    var limit = 10;
    var dataArray = [];
    const [callType, setCallType] = useState('');

    const [filterUserId, setFiterUserId] = useState('');
    const [endDate, setEnddate] = useState('');
    const [startDate, setStartdate] = useState('');
    const [isLoading, setLoading] = useState(true);

    const [users, setusers] = useState([]);
    const [reportLogs, setreportLogs] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [pagenum, setpagenum] = useState(0);
    const [pageNumArr, setpageNumArr] = useState([]);
    const testArr = [];

    const reqBody = {
        type: callType,
        userId: filterUserId,
        from: startDate,
        to: endDate
    };

    console.log(reqBody);


    React.useEffect(() => {
        axios.post('/call/call-log-report', reqBody)
            .then(res => {
                if (res.data.status === true) {
                    setreportLogs(res.data.dataSet);
                    //setLoading(false);
                    console.log(res.data.dataSet)
                }

            })
            .catch((error) => {
            })
    }, []);

    React.useEffect(() => {
        axios.get('/user/get-active-users')
            .then(res => {
                if (res.data.status === true) {
                    setActiveUsers(res.data.dataSet)
                    //setLoading(false);
                }
            })
            .catch((error) => {
            })
    }, []);

    const handelSubmit = (e) => {
        e.preventDefault();
        setreportLogs([]);

        const dataObject = {
            type: callType,
            userId: filterUserId,
            from: startDate,
            to: endDate
        };
        axios.post('/call/call-log-report', dataObject)
            .then(res => {
                if (res.data.status === true) {
                    setreportLogs(res.data.dataSet);

                    if (reportLogs.length !== 0) {
                        setLoading(false);
                    } else {
                        setLoading(true);
                    }

                }

            })
            .catch((error) => {
            })

    }

    function handleEvent(event, picker) {

        // console.log('picker.startDate');
        // console.log(picker.startDate._d);
        // console.log('picker.endtDate');
        // console.log(picker.endDate._d);

        // setStartdate(picker.startDate._d);
        // setEnddate(picker.endDate._d);

    }

    function handleCallback(start, end, label) {
        setStartdate(start._d);
        setEnddate(end._d);
    }

    const setArray = () => {
        for (let index = 0; index < reportLogs.length; index++) {
            testArr.push({
                calledDate: reportLogs[index].calledDate ? moment(reportLogs[index].calledDate).format('lll') : "N/A",
                callCreatedDate: reportLogs[index].createdAt ? moment(reportLogs[index].createdAt).format('lll') : "N/A",
                calledNumber: reportLogs[index].calledNumber?reportLogs[index].calledNumber:"N/A",
                calledDuration: reportLogs[index].calledDuration?reportLogs[index].calledDuration:"N/A",
                calledType: reportLogs[index].calledType == 0 ? 'Pending' : reportLogs[index].calledType == 1 ? 'Incoming' : reportLogs[index].calledType == 2 ? 'Outgoing' :
                    reportLogs[index].calledType == 3 ? 'Missed' : reportLogs[index].calledType == 4 ? 'Rejected' : reportLogs[index].calledType == 5 ? 'Not picked by client' : 'N/A',
                status: reportLogs[index].status == 0 ? 'Incompleted' : 'completed',
                AgentName: reportLogs[index].calledAgent ? reportLogs[index].calledAgent.userName : 'N/A',
                clientName: reportLogs[index].callUserID ? reportLogs[index].callUserID.name : 'N/A'
            })
        }

    }

    return (
        <>
            <Header />

            <div className="navigation">
                <Row>
                    <Col lg={2} md={3} sm={3}></Col>
                    <Col lg={10} md={3} sm={3}><b><BsPersonLinesFill></BsPersonLinesFill>Call Logs Report</b></Col>
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
                                <Form.Label>Select User</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={e => setFiterUserId(e.target.value)}>
                                    <option value="">All Users</option>
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
                        <Col lg={2} md={4} className=" p-3">
                            <Form.Group controlId="formBasicRole">
                                <Form.Label>Select Date Range</Form.Label>
                                <DateRangePicker onEvent={handleEvent} onCallback={handleCallback}>
                                    <input />
                                </DateRangePicker>
                            </Form.Group>
                        </Col>
                        {/* <Col lg={2} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Label>end date</Form.Label>
                                    <input type="date"  className="form-control" />
                            </Form.Group>
                        </Col> */}

                        <Col lg={4} md={4} className="mt-5">
                            <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                                Search
                            </Button>{' '}
                            <Button variant="info btn-block" type="" className="">
                                <CSVLink style={{ textDecoration: 'none' }} data={testArr}
                                    asyncOnClick={true}
                                    onClick={setArray()}

                                >Download</CSVLink>
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
                                <th>Called Date</th>
                                <th>Created Date</th>
                                <th>Call Type</th>
                                <th>Status</th>
                                <th>Agent Name</th>
                                <th>Client Name</th>

                            </tr>
                        </thead>
                        <tbody>
                            {reportLogs.length != 0 ? reportLogs.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.calledNumber}</td>
                                        <td>{item.calledDate ? moment(item.calledDate).format('lll') : "N/A"}</td>
                                        <td>{item.createdAt ? moment(item.createdAt).format('lll') : "N/A"}</td>
                                        <td>
                                            {item.calledType == 0 ? <Badge bg="info">Pending</Badge> : item.calledType == 1 ? <Badge bg="primary">Incoming</Badge> : item.calledType == 2 ?
                                                <Badge bg="secondary">Outgoing</Badge> : item.calledType == 3 ?
                                                    <Badge bg="warning">Missed</Badge> : item.calledType == 4 ? <Badge bg="danger">Rejected</Badge> : <Badge bg="dark">Not picked by client</Badge>

                                            }
                                        </td>
                                        <td>
                                            {item.status == 1 ? <Badge bg="info">Completed</Badge> : <Badge bg="dark">Incompleted</Badge>}
                                        </td>
                                        <td>{item.calledAgent ? item.calledAgent.userName : ""}</td>
                                        <td>{item.callUserID ? item.callUserID.name : ""}</td>

                                    </tr>
                                )
                            }) :
                                <tr className="text-center"><td colSpan={7} >Data Not Found!</td></tr>

                            }


                        </tbody>
                    </Table>

                    <ToastContainer />
                </Col>
            </Row>
            <Footer />
        </>

    );
}

export default CallLogsReport
import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react'

import { Nav, NavLink, Row, Col, Button, Card, Navbar, NavItem, NavDropdown, Collapse } from 'react-bootstrap'
import { Link } from "react-router-dom";
import '../css/sideNav.css'
import { BsPersonFill, BsPersonPlusFill, BsFillHouseDoorFill, BsFillFileEarmarkTextFill, BsPersonLinesFill, BsTextRight, BsPeople, BsPauseFill, BsFillTelephoneFill, BsFillTelephoneForwardFill } from "react-icons/bs";

function Slider() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    return (
        <>
            <Col lg={2} md={3} sm={3} className="shadow-sm rounded-lg test-left slide_w p-1">
                <Nav defaultActiveKey="/dashboard" className="flex-column justify-content-end flex-grow-1 pe-3">
                    {/* <Nav.Link to="/dashboard">Dashboard</Nav.Link> */}
                    <Link className="sideNavItem" to={'/dashboard'} >
                        <BsFillHouseDoorFill></BsFillHouseDoorFill> Dashboard
                    </Link  >

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <BsPersonFill></BsPersonFill> User
                    </Button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <Link className="sideNavItem" to={'/create-user'} >
                                <BsPersonPlusFill></BsPersonPlusFill> Add User
                            </Link  ><br></br><br></br>

                            <Link className="sideNavItem" to={'/show-all-users'} >
                                <BsPersonLinesFill></BsPersonLinesFill> User List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen1(!open1)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open1}
                    >
                        <BsTextRight></BsTextRight> User Role
                    </Button>
                    <Collapse in={open1}>
                        <div id="example-collapse-text">
                            <Link className="sideNavItem" to={'/create-user-role'} >
                                <BsPauseFill></BsPauseFill> Add Role
                            </Link  ><br></br><br></br>

                            <Link className="sideNavItem" to={'/show-user-roles'} >
                                <BsPersonLinesFill></BsPersonLinesFill> Role List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen2(!open2)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        <BsPeople></BsPeople> Client
                    </Button>
                    <Collapse in={open2}>
                        <div id="example-collapse-text">
                            <Link className="sideNavItem" to={'/client'} >
                                <BsFillTelephoneFill></BsFillTelephoneFill> Add Client
                            </Link  ><br></br><br></br>

                            <Link className="sideNavItem" to={'/client-list'} >
                                <BsFillTelephoneForwardFill></BsFillTelephoneForwardFill> Client List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen3(!open3)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open3}
                    >
                        <BsFillTelephoneFill></BsFillTelephoneFill> Calls
                    </Button>
                    <Collapse in={open3}>
                        <div id="example-collapse-text">
                            <Link className="sideNavItem" to={'/call-list'} >
                                <BsFillTelephoneFill></BsFillTelephoneFill> Call List
                            </Link  ><br></br><br></br>
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen4(!open4)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open4}
                    >
                        <BsFillFileEarmarkTextFill></BsFillFileEarmarkTextFill> Report
                    </Button>
                    <Collapse in={open4}>
                        <div id="example-collapse-text">
                            <Link className="sideNavItem" to={'/report-call-logs'} >
                                <BsFillTelephoneFill></BsFillTelephoneFill> Call Logs
                            </Link  ><br></br><br></br>
                        </div>
                    </Collapse>

                </Nav>
            </Col>

        </>
    )
}

export default Slider
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Card, Row, Table, Container, Button, Form, ButtonGroup, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill, BsTextRight, BsPauseFill } from "react-icons/bs";
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';
import logout from './Logout';


function Dashboard() {
  return (
    <>
      <Header />
      <Row className="">
        <div className="navigation">
          <Row>
            <Col lg={2} md={3} sm={3}></Col>
            <Col lg={10} md={3} sm={3}><b><BsTextRight></BsTextRight> Dashboard</b></Col>
          </Row>
        </div>
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">
          <Card className=" p-5 mt-2 ml-2">
            <Card.Header>Hi</Card.Header>
            <Card.Body>

              <ToastContainer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </>

  )
}

export default Dashboard
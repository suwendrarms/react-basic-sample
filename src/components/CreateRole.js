import React, { useState } from 'react'
import { Button, Form, Container, Nav, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Services/axio";
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill, BsTextRight, BsPauseFill } from "react-icons/bs";


function CreateRole() {

  const [name, setname] = useState('');
  const [showLogout, setShowLogout] = useState(false);


  const handelSubmit = (e) => {
    e.preventDefault();

    const studentObject = {
      name: name
    };

    axios.post('/user/create-user-role', studentObject)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

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


    //history('/')

  }

  return (
    <div>
      <Header />
      <Row className="">

        <div className="navigation">
          <Row>
            <Col lg={2} md={3} sm={3}></Col>
            <Col lg={10} md={3} sm={3}><b><BsPauseFill></BsPauseFill> Users Role</b></Col>
          </Row>
        </div>
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">
          <Card className=" p-5 mt-2 ml-2">
            {/* <Card.Header>User Role</Card.Header> */}
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicName" className="text-left font-weight-bold">
                  <Form.Label >Role Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setname(e.target.value)} type="text" placeholder="Enter name" />
                </Form.Group>

                <Col className="text-end mt-3">
                  <Link className="edit-link" path="/show-user-roles"
                    to="/show-user-roles">
                    <Button className="editBtn" variant="info" >Back</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-user-roles"
                    to="/show-user-roles">
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
    </div>
  )
}

export default CreateRole
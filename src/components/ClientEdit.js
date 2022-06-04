import React, { useState } from 'react'
import { Button, Form, Container, Nav, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Services/axio";
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill, BsTextRight, BsPauseFill } from "react-icons/bs";
import LogoutModel from './LogoutModel';

function ClientEdit() {


    const [name, setname] = useState('');
    const [nameError, setnameError] = useState('');
    const [contactError, setcontactError] = useState('');
    const [users, setusers] = useState([]);
    const [contact, setcontact] = useState('');
    const [contact2, setcontact2] = useState('');
    const [user_id, setSelectUser] = useState('');
    const [client, setClientdata] = useState({});
    const [nic, setnic] = useState('');
    const params = useParams();
    const [showLogout, setShowLogout] = useState(false);
    const reqBody = {
        id: params.id
    };

    React.useEffect(() => {
        axios.post('/client/get-client-details', reqBody)
            .then(res => {
                setClientdata(res.data.dataSet);
            })
            .catch((error) => {
                if (error.response.data.error) {

                    if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                        setShowLogout(true);
                    }

                }
            })
    }, []);

    React.useEffect(() => {
        axios.get('/user/get-active-users')
            .then(res => {
                setusers(res.data.dataSet);
            })
            .catch((error) => {
                if (error.response.data.error) {

                    if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {
                        setShowLogout(true);
                    }

                }
            })
    }, []);


    const handleValidation = (event) => {
        let formIsValid = false;

        if (!contact.match(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/)) {
            setcontactError("please enter valid number!");
            formIsValid = false;

        } else {
            setcontactError("");
            formIsValid = true;

        }

        if (name === "") {
            setnameError("please enter name");
            formIsValid = false;
        } else {
            setnameError("");
            formIsValid = true;
        }

        return formIsValid;
    };


    const handelSubmit = (e) => {
        e.preventDefault();
        //handleValidation();

        // if (handleValidation() === true) {

        const dataObject = {
            id: params.id,
            masterData: {
                contactNumber: contact !== "" ? contact : client.contactNumber,
                contactNumber2: contact2 !== "" ? contact2 : client.contactNumber2,
                name: name !== "" ? name : client.name,
                nic: nic !== "" ? nic : client.nic,
                user: user_id !== "" ? user_id : client.user
            }
        };


        axios.post('/client/client-update', dataObject)
            .then((res) => {
                if (res.data.status === true) {

                    toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
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

        // }

    }

    return (
        <div>

            <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
            <Header />
            <Row className="">

                <div className="navigation">
                    <Row>
                        <Col lg={2} md={3} sm={3}></Col>
                        <Col lg={10} md={3} sm={3}><b><BsPauseFill></BsPauseFill> Client Edit</b></Col>
                    </Row>
                </div>
                <Slider />

                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">
                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>User Role</Card.Header> */}
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicName" className="text-left font-weight-bold">
                                    <Form.Label >Contact Number 1<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setcontact(e.target.value)} type="text" defaultValue={client.contactNumber} placeholder="Enter Contact number" />
                                </Form.Group>
                                <small id="emailHelp" className="text-danger form-text">
                                    {contactError}
                                </small>

                                <Form.Group controlId="formBasicName" className="text-left font-weight-bold mt-3">
                                    <Form.Label >Contact Number 2 (additional)</Form.Label>
                                    <Form.Control onChange={e => setcontact2(e.target.value)} type="text" defaultValue={client.contactNumber2} placeholder="Enter Contact number" />
                                </Form.Group>

                                <Form.Group controlId="formBasicName" className="text-left font-weight-bold mt-3">
                                    <Form.Label >Name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setname(e.target.value)} defaultValue={client.name} type="text" placeholder="Enter name" />
                                </Form.Group>
                                <small id="emailHelp" className="text-danger form-text">
                                    {nameError}
                                </small>

                                <Form.Group controlId="formBasicUserName" className="mt-3">
                                    <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                                    <Form.Control onChange={e => setnic(e.target.value)} type="text" defaultValue={client.nic} placeholder="NIC" />
                                </Form.Group>

                                <Form.Group controlId="formBasicRole" className="mt-3">
                                    <Form.Label>Select User<span className="text-danger">*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" defaultValue={client.user} onChange={e => setSelectUser(e.target.value)}>
                                        {users.map((item) => {
                                            return (

                                                <>
                                                    <option value={item._id} selected={item._id === client.user ? "selected" : ""}>{item.firstName} {item.lastName}</option>
                                                </>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                <Col className="text-end mt-3">
                                    <Link className="edit-link" path="/client-list"
                                        to="/client-list">
                                        <Button className="editBtn" variant="info" >Back</Button>
                                    </Link>{' '}
                                    <Link className="edit-link" path="/client-list"
                                        to="/client-list">
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
            </Row >
            <Footer />

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </div >
    )
}

export default ClientEdit

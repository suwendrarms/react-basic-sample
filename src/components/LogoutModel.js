import React, { useState } from 'react'
import { Col, Row, Table, Container, Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../Services/axio";

const LogoutModel = (props) => {

    let history = useNavigate();

    return (
        <>
            <Modal
                show={props.show}
                cancel={props.close}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>Session expired please login again!</h4>
                </Modal.Body>
                <Modal.Footer>

                    <Link className="edit-link" path={"/logout"}
                        to={'/logout'}>
                        <Button variant="danger" >Login</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default LogoutModel
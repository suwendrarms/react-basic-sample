import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row, ButtonGroup, Navbar, Dropdown, DropdownButton } from "react-bootstrap";

import axios from "../Services/axio";
import '../css/header.css'
import LogoutModel from './LogoutModel';

function Header() {

  let history = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  React.useEffect(() => {
    axios.get('/user/get-user-roles')
      .then(res => {
      })
      .catch((error) => {
        if (error.response.data.error) {

          if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

            setShowLogout(true);
          }

        }
      })
  }, []);

  function logout() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    delete axios.defaults.headers.common.Authorization
    history('/');
    //window.location.href = "/"

  }

  return (
    <div>
      <Row className="">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Col lg={2} md={2} sm={22} className="rext-center p-2">
              <Navbar.Brand href="#home">Wellness Application</Navbar.Brand>
            </Col>
            <Col lg={9} md={9} sm={9} className="">


            </Col>
            <Col lg={1} md={1} sm={1} className="">
              <DropdownButton className=''
                as={ButtonGroup}
                align={{ lg: 'end' }}
                title="Account"
                id="dropdown-menu-align-responsive-1"
                class="btn-menu"
              >
                {/* <Dropdown.Item className='p-2' eventKey="1">My Profile</Dropdown.Item> */}
                <Dropdown.Item onClick={e => logout()} className='' eventKey="2">Logout</Dropdown.Item>
              </DropdownButton>

            </Col>
          </Navbar.Collapse>

        </Navbar>
      </Row>

      <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
    </div >
  )
}

export default Header
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../Services/axio";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Card } from 'react-bootstrap'
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import '../css/userEdit.css'
import { BsPersonLinesFill } from "react-icons/bs";
import LogoutModel from './LogoutModel';

function UserEdit() {
  const [data, setdata] = useState({});
  const [role, setRole] = useState([]);
  const [passError, setPassError] = useState("");
  const params = useParams();
  const [emailError, setemailError] = useState("");
  const [oldpasswordError, setOldpasswordError] = useState("");
  const [oldPassStatus, setOldPasswordStatus] = useState(false);

  const [showLogout, setShowLogout] = useState(false);
  const [fname, setfname] = useState('');
  const [nic, setnic] = useState('');
  const [lname, setlname] = useState('');
  const [uname, setuname] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState('');
  const [pass, setpassword] = useState('');
  const [conPass, setConPassword] = useState('');
  const [oldPass, setOldPassword] = useState('');
  const [userRole, setSelectrole] = useState('');

  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {
    axios.post('/user/get-user-details', reqBody)
      .then(res => {
        setdata(res.data.dataSet)
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
    axios.get('/user/get-user-roles')
      .then(res => {
        setRole(res.data.dataSet)
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

    if (pass !== "") {

      if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
        setPassError("New Password  length must best min 6 Chracters and Max 12 Chracters");
        formIsValid = false;
      } else {

        if (pass === conPass) {
          setPassError("");
          //formIsValid = true;
          if (oldPass !== "") {

            const userObject = {
              password: oldPass,
              email: email !== "" ? email : data.email,

            };

            axios.post('/user/verify-password', userObject)
              .then((res) => {
                if (res.data.status === true) {
                  setOldPasswordStatus(true);
                  setOldpasswordError(res.data.message);

                } else {
                  setOldPasswordStatus(false);
                  setOldpasswordError(res.data.message);


                }

              }).catch((error) => {
                if (error.response.data.error) {

                  if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

                    setShowLogout(true);
                  }

                }
              })

            if (oldPassStatus === true) {
              formIsValid = true;
            } else {
              formIsValid = false;
            }

          } else {
            setOldpasswordError("Please enter old password");
            formIsValid = false;

          }
        } else {
          setPassError("Passwords do not match!");
          formIsValid = false;
        }

      }

    } else {
      formIsValid = true;

    }

    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    if (handleValidation() === true) {

      const userObject = {

        id: params.id,
        masterData:
        {
          firstName: fname !== "" ? fname : data.firstName,
          lastName: lname !== "" ? lname : data.lastName,
          userName: uname !== "" ? uname : data.userName,
          nic: nic !== "" ? nic : data.nic,
          email: email !== "" ? email : data.email,
          contactNumber: contact !== "" ? contact : data.contactNumber,
          password: pass !== "" ? pass : "",
          userRole: userRole
        }
      };


      axios.post('/user/user-update', userObject)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

            //history('/show-all-users')

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

    } else {
      //toast.warn('not valid', { position: toast.POSITION.TOP_RIGHT })
    }

  }

  return (
    <>
      <Header />
      <Row className="">
        <div className="navigation">
          <Row>
            <Col lg={2} md={3} sm={3}></Col>
            <Col lg={10} md={3} sm={3}><b><BsPersonLinesFill></BsPersonLinesFill> Edit User</b></Col>
          </Row>
        </div>
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <Card className=" p-5 mt-2 ml-2">
            {/* <Card.Header>Edit User</Card.Header> */}
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                  <Form.Label >First Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setfname(e.target.value)} defaultValue={data.firstName} type="text" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group controlId="formBasicLastName" className="mt-3">
                  <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setlname(e.target.value)} type="text" defaultValue={data.lastName} placeholder="Enter last name" />
                </Form.Group>

                <Form.Group controlId="formBasicUserName" className="mt-3">
                  <Form.Label>User Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setuname(e.target.value)} type="text" defaultValue={data.userName} placeholder="User name" />
                </Form.Group>

                <Form.Group controlId="formBasicUserName" className="mt-3">
                  <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setnic(e.target.value)} type="text" defaultValue={data.nic} placeholder="NIC" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setemail(e.target.value)} type="email" defaultValue={data.email} placeholder="Enter email" />
                </Form.Group>

                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>

                <Form.Group controlId="formBasicNumber" className="mt-3">
                  <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control onChange={e => setcontact(e.target.value)} defaultValue={data.contactNumber} type="text" placeholder="enter Contact Number" />
                </Form.Group>

                <Form.Group controlId="formBasicRole" className="mt-3">
                  <Form.Label>User Role <span className="text-danger">*</span></Form.Label>
                  <Form.Select aria-label="Default select example" defaultValue={data.userRole} onChange={e => setSelectrole(e.target.value)}>
                    {role.map((item) => {
                      return (

                        <>
                          <option value={item._id} selected={item._id === data.userRole ? "selected" : ""}>{item.name}</option>
                        </>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <div className='pwSection'>

                  <h5>Password</h5>
                  <hr></hr>
                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control onChange={e => setpassword(e.target.value)} type="password" placeholder="Password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={e => setConPassword(e.target.value)} type="password" placeholder="Password" />
                  </Form.Group>
                  <small id="emailHelp" className="text-danger form-text">
                    {passError}
                  </small>

                  <Form.Group controlId="formBasicOldPassword" className="mt-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control onChange={e => setOldPassword(e.target.value)} type="password" placeholder="Password" />
                  </Form.Group>
                  <small id="emailHelp" className="text-danger form-text">
                    {oldpasswordError}
                  </small>

                </div>

                <Col className="text-end mt-5">
                  <Link className="edit-link" path="/show-all-users"
                    to="/show-all-users">
                    <Button className="editBtn" variant="info" >Back</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-all-users"
                    to="/show-all-users">
                    <Button className="editBtn" variant="danger"> Cancel</Button>
                  </Link>{' '}
                  <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                    Update
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
    </>
  )
}

export default UserEdit


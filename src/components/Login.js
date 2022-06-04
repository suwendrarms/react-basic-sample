import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, Redirect, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Services/axio";
function Login() {


  const [email, setemail] = useState('');
  const [pass, setpassword] = useState('');
  const [passwordError, setpasswordError] = useState("");
  const [logError, setlogError] = useState("");
  const [emailError, setemailError] = useState("");

  function validateForm() {
    return email.length > 0 && pass.length > 0;
  }

  let history = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;
    if (email === "") {
      setemailError("please enter valid email");
      return false;
    }
    else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!pass.match(/^[a-zA-Z]{8,12}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 12 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginfail = (event) => {
    setlogError(
      "Please enter valid login credentials."
    );
  }


  const handelSubmit = (e) => {
    e.preventDefault();
    handleValidation();

    if (email !== "" && pass !== "") {
      const studentObject = {
        email: email,
        password: pass,
        type:1
      };

      axios.post('/user/login', studentObject,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
        .then((res) => {

          if (res.data.status === true) {

            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user_id", res.data.id);
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

            //history('/dashboard');
            // window.location.reload();
            window.location.href = "/dashboard";

          } else {
            sessionStorage.setItem("validations", JSON.stringify(res.data.validations));
            toast.warn('Login fail Please enter valid login credentials.', { position: toast.POSITION.TOP_RIGHT })

            history('/');
            loginfail();
          }

        }).catch((error) => {
          if (error.response.data.error) {

            if (error.response.data.error === "Authetication failed!") {

              toast.warn('Login failed!. Please enter valid login credentials.', { position: toast.POSITION.TOP_RIGHT })
            }

          }
        })

    }

  }

  return (

    <>
      <Container>
        <Row className="mt-5 ">
          <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
            <Form id="loginform" onSubmit={e => handelSubmit(e)}>
              <h1 className='text-center'>Login</h1>
              <hr></hr>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setemail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>

              <div className="form-group pt-3 pb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setpassword(event.target.value)}
                />
                {/* <small id="passworderror" className="text-danger form-text">
                              {passwordError}
                            </small> */}


              </div>

              <div className="form-group form-check pb-3">
                <small id="logerror" className="text-danger form-text">
                  {logError}
                </small>
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-success login w-100">
                  Login
                </button>
              </div>
              <br></br>
              {/* <a href='' className='text-center'>Forgot password</a> */}

            </Form>
            <ToastContainer />
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2021. All Rights Reserved.</h6>
      </Container>
    </>
  )
}

export default Login
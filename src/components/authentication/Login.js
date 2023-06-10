import React, { useState } from "react";
import { Row, Col, Form, Button, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../App";
import { CustomContext } from "../../context/AuthContext";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  const context = CustomContext();

  const userType = ["admin", "ngo", "donor", "member"];

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const [inputVal, setInputVal] = useState({
    userType: "",
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userType: inputVal.userType,
      userId: inputVal.id,
      password: inputVal.password,
    };
    const loginStatus = context?.login(userData);
    if (loginStatus) setInputVal({ userType: "", id: "", password: "" });
  };

  return (
    <Row className="me-0">
      <Col md={6} className="m-0">
        <div className="bg-image"></div>
      </Col>
      <Col md={6} className="login-form p-4">
        <div className="d-flex justify-content-center">
          <Form className="rounded my-4 w-75" onSubmit={handleSubmit}>
            <h1 className="text-center mt-2 mb-4 fw-semibold text-primary">
              LOGIN
            </h1>
            <FormGroup className="my-3">
              <Form.Label htmlFor="id">Who You Are?</Form.Label>
              <Form.Select
                type="text"
                name="userType"
                id="userType"
                onChange={handleChange}
                value={inputVal.userType}
                className="text-capitalize text-center"
              >
                <option value={0} hidden>
                  {"--select user type--"}
                </option>
                {userType.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </Form.Select>
            </FormGroup>
            <FormGroup className="my-3">
              <Form.Label htmlFor="id">UserID / Email Address</Form.Label>
              <Form.Control
                type="text"
                name="id"
                id="id"
                placeholder="Enter Id"
                value={inputVal.id}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="my-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={inputVal.password}
                onChange={handleChange}
              />
            </FormGroup>

            <div
              className="text-warning px-2 text-end"
              style={{ cursor: "pointer" }}
            >
              <span
                role={"button"}
                onClick={() => {
                  inputVal.userType && inputVal.id
                    ? toggle()
                    : toast.info(
                        "Select User Type and Enter User id to reset       password",
                        TOAST_PROP
                      );
                }}
              >
                Forgot Password
              </span>
              <ForgotPassword
                show={show}
                toggle={toggle}
                userType={inputVal.userType}
                userId={inputVal.id}
              />
            </div>

            <div className="d-flex justify-content-center align-items-center flex-column my-3">
              <Button variant="secondary" type="submit" className="w-25 ">
                Login
              </Button>
              <span className="mt-3">
                Not a Member? <Link to="/register">Register Here</Link>{" "}
              </span>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

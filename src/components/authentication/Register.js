import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCities } from "../../api/adminService";
import { createDonor } from "../../api/DonorService";
import { createMember } from "../../api/MemberService";
import { TOAST_PROP } from "../../App";
import { createNgo } from "../../api/ngoService";

export default function Register() {
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState({
    user: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllCities()
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function validateFields() {
    if (
      inputVal.user.length === 0 ||
      inputVal.name.length === 0 ||
      inputVal.email.length === 0 ||
      inputVal.address.length === 0 ||
      inputVal.city.length === 0 ||
      inputVal.password.length === 0 ||
      inputVal.phone.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    if (inputVal.phone.length >= 0) {
      toast.error("Enter valid phone number!!", TOAST_PROP);
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateFields()) return;
    const userData = {
      name: inputVal.name,
      email: inputVal.email,
      phone: inputVal.phone,
      address: inputVal.address,
      city: inputVal.city,
      password: inputVal.password,
      user: inputVal.user,
    };

    const userPromise = () => {
      if (inputVal.user === "donor") return createDonor(userData);
      if (inputVal.user === "member") return createMember(userData);
      if (inputVal.user === "ngo") return createMember(userData);
    };

    toast
      .promise(
        userPromise(),
        {
          pending: "Registering...",
          success: "Registration Successfull!! Please Login to continue...",
        },
        TOAST_PROP
      )
      .then((res) => {
        handleReset();
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Registration Failed!!", TOAST_PROP);
      });

    console.log(inputVal);
  }

  function handleReset() {
    setInputVal({
      user: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      password: "",
    });
  }

  return (
    <Container className="mx-auto">
      <Form
        className="p-3 rounded w-100 mx-auto bg-light"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center fw-bold text-primary">REGISTER</h1>
        <Row xs={1} sm={1} md={2}>
          <Col className="my-2">
            <Form.Label className="text-info" htmlFor="user">
              Who You Are ?
            </Form.Label>
            <Form.Select
              className="text-center text-capitalize shadow-sm"
              name="user"
              id="user"
              onChange={handleChange}
              value={inputVal.user}
            >
              <option value={0} hidden>
                --select user--
              </option>
              <option className="" value={"ngo"}>
                NGO
              </option>
              <option className="" value={"donor"}>
                Donor
              </option>
              <option className="" value={"member"}>
                Member
              </option>
            </Form.Select>
          </Col>
          <Col className="my-2">
            <Form.Label className="text-info" htmlFor="name">
              {inputVal.user === "ngo" ? "Organization Name" : "Name"}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={
                inputVal.user === "ngo"
                  ? "Enter your organization"
                  : "Enter your name"
              }
              name="name"
              id="name"
              value={inputVal.name}
              onChange={handleChange}
              className="shadow-sm"
            />
          </Col>
          <Col className="my-2">
            <Form.Label className="text-info" htmlFor="email">
              Email ID
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={inputVal.email}
              onChange={handleChange}
              className="shadow-sm"
            />
          </Col>
          <Col className="my-2">
            <Form.Label className="text-info" htmlFor="phone">
              Phone
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone number"
              name="phone"
              id="phone"
              value={inputVal.phone}
              onChange={handleChange}
              className="shadow-sm"
            />
          </Col>
          <Col md={12} className="my-2">
            <Form.Label className="text-info" htmlFor="address">
              Address
            </Form.Label>
            <Form.Control
              as={"textarea"}
              type="text"
              placeholder="Enter your address"
              name="address"
              id="address"
              value={inputVal.address}
              onChange={handleChange}
              className="shadow-sm"
            />
          </Col>
          <Col className="my-2">
            <Form.Label className="text-info" htmlFor="city">
              City
            </Form.Label>
            <Form.Select
              className="text-center text-capitalize shadow-sm"
              name="city"
              id="city"
              onChange={handleChange}
              value={inputVal.city}
            >
              <option value={0} hidden>
                {"--Select City--"}
              </option>
              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.name}
                  className="text-capitalize"
                >
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="my-2">
            <Form.Label className="text-info" htmlFor="password">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              value={inputVal.password}
              onChange={handleChange}
              className="shadow-sm"
            />
          </Col>
        </Row>
        <div className="W-100 d-flex justify-content-center flex-column align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4 w-100">
            <Button variant="secondary" className="w-25" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" className="w-25" type="submit">
              Register
            </Button>
          </div>
          <div className="mt-2">
            <span>Already Registered ?&nbsp;</span>
            <Link to="/login">Login Here</Link>
          </div>
        </div>
      </Form>
    </Container>
  );
}

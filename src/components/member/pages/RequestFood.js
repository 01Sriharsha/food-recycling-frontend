import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllCities, getAllFoodType } from "../../../api/adminService";
import { createNewRequestFood } from "../../../api/MemberService";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";

export default function RequestFood() {
  const context = CustomContext();

  const [cities, setCities] = useState([]);

  const [foodTypes, setFoodTypes] = useState([]);

  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    quantity: "",
    foodType: "",
    description: "",
  });

  useEffect(() => {
    getAllCities()
      .then((res) => setCities(res.data))
      .catch((err) => console.log(err));
    getAllFoodType()
      .then((res) => setFoodTypes(res.data))
      .catch((err) => console.log(err));
    loadUserDetailsFromContext();
  }, []);

  function loadUserDetailsFromContext() {
    setInputVal({
      ...inputVal,
      name: context?.user?.name,
      email: context?.user?.email,
      phone: context?.user?.phone,
      city: context?.user?.city,
      address: context?.user?.address,
    });
  }

  function handleChange(e) {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function validate() {
    if (
      inputVal.foodType.length === 0 ||
      inputVal.quantity.length === 0 ||
      inputVal.city.length === 0 ||
      inputVal.address.length === 0 ||
      inputVal.description.length === 0 ||
      inputVal.phone.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const memberId = context?.user?.id;
    const requestData = {
      phone: inputVal.phone,
      city: inputVal.city,
      address: inputVal.address,
      quantity: inputVal.quantity,
      foodType: inputVal.foodType,
      description: inputVal.description,
      status: "pending",
    };
    toast
      .promise(
        createNewRequestFood(requestData, memberId),
        {
          pending: "Posting food request...",
          success: "Food Requested posted successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res.data);
        handleReset();
        // navigate("/all-requests")
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data
            ? err.response.data
            : "Failed to post food request!!",
          TOAST_PROP
        );
      });
  };

  const handleReset = () =>
    setInputVal({
      ...inputVal,
      quantity: "",
      foodType: "",
      description: "",
    });

  return (
    <Container className="p-2">
      <Form
        className="p-3 w-75 mx-auto bg-light shadow mt-1 rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-primary fw-semibold">Request Food</h1>
        <Row md={2} xs={1} className="m-0">
          <Col className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              disabled
              name="name"
              placeholder="Enter your name"
              className="text-capitalize"
              value={inputVal.name}
              onChange={handleChange}
            />
          </Col>

          <Col className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled
              name="email"
              placeholder="Enter your email"
              value={inputVal.email}
              onChange={handleChange}
            />
          </Col>

          <Col className="my-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Enter phone number"
              value={inputVal.phone}
              onChange={handleChange}
            />
          </Col>

          <Col className="my-2">
            <Form.Label htmlFor="foodType">Food Type</Form.Label>
            <Form.Select
              name="foodType"
              id="foodType"
              value={inputVal.foodType}
              onChange={handleChange}
              className="text-capitalize text-center"
            >
              <option hidden>{"--select food type--"}</option>
              {foodTypes.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.foodType}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col className="my-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Enter the quantity you want to request"
              value={inputVal.quantity}
              onChange={handleChange}
            />
          </Col>

          <Col className="my-2">
            <Form.Label>City</Form.Label>
            <Form.Select
              name="city"
              value={inputVal.city}
              onChange={handleChange}
              className="text-center"
            >
              <option hidden>--select city--</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="address"
              placeholder="Enter your address"
              value={inputVal.address}
              onChange={handleChange}
            />
          </Col>

          <Col className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="description"
              placeholder="Type here..."
              value={inputVal.description}
              onChange={handleChange}
            />
          </Col>

          <div className="w-100 d-flex justify-content-center gap-2 my-3">
            <Button variant="secondary" className="" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" className="" type="submit">
              Submit
            </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
}

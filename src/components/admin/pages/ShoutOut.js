import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createShoutOut, getAllFoodType } from "../../../api/adminService";
import { TOAST_PROP } from "../../../App";

export default function ShoutoutPage() {
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState({
    foodType: "",
    foodItem: "",
    quantity: "",
  });

  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    getAllFoodType()
      .then((res) => setFoodTypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validate = () => {
    if (
      inputVal.foodType.length === 0 ||
      inputVal.foodItem.length === 0 ||
      inputVal.quantity.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    if (inputVal.foodItem.match(/[0-9]/)) {
      toast.error("Food item must be alpahbetical characters only!!" , TOAST_PROP);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const shoutOutData = {
      foodType: inputVal.foodType,
      foodItem: inputVal.foodItem,
      quantity: inputVal.quantity,
    };
    toast
      .promise(
        createShoutOut(shoutOutData),
        {
          pending: "Posting shout out...",
          success: "Shout out posted successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => navigate("/admin/all-shoutouts"))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to post shout out!!", TOAST_PROP);
      });
    setInputVal({ foodType: "", foodItem: "", quantity: "" });
  };

  return (
    <div>
      <Container className="">
        <Form onSubmit={handleSubmit} className="my-3 w-50 p-3 mx-auto">
          <h2 className="text-center text-primary fw-semibold">SHOUTOUT</h2>

          <Form.Group>
            <Form.Label>Food Type</Form.Label>
            <Form.Select
              name="foodType"
              className="text-center text-capitalize"
              value={inputVal.foodType}
              onChange={handleChange}
            >
              <option hidden>--select food type--</option>
              {foodTypes.map((foodType) => (
                <option key={foodType.id} value={foodType.foodType}>
                  {foodType.foodType}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label>What kind of food do you need?</Form.Label>
            <Form.Control
              type="text"
              name="foodItem"
              placeholder="Enter food item"
              value={inputVal.foodItem}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label>How much do you need?</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={inputVal.quantity}
              onChange={handleChange}
            />
            <small className="text-muted">*Food quantity must be in Kg's</small>
          </Form.Group>

          <div className="d-flex justify-content-start align-items-center">
            <Button variant="primary" type="submit">
              Request
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

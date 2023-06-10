import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createCity,
  createfoodType,
  deleteCity,
  deletefoodType,
  getAllCities,
  getAllFoodType,
} from "../../../api/adminService";
import { TOAST_PROP } from "../../../App";
import { AiFillDelete } from "react-icons/ai";

export default function AddFoodType() {
  const [foodType, setFoodType] = useState("");

  const [foodTypes, setFoodTypes] = useState([]);

  const [error, setError] = useState("");

  const loadAllFoodTypes = () =>
    getAllFoodType()
      .then((res) => setFoodTypes(res.data))
      .catch((err) => console.log(err));

  useState(() => {
    loadAllFoodTypes();
  }, []);

  const handleChange = (e) => {
    if (e.target.value.match(/[0-9]/)) {
      setError("*Food Type must be alpahbetical characters only!!");
      return;
    }
    setFoodType(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const foodTypeData = { foodType: foodType };
    toast
      .promise(
        createfoodType(foodTypeData),
        {
          pending: "Adding...",
          success: "Food Type added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllFoodTypes();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add Food Type !!", TOAST_PROP);
      });
    setFoodType("");
  }

  function handleDelete(id) {
    toast
      .promise(
        deletefoodType(id),
        {
          pending: "Removing...",
          success: "Food Type removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllFoodTypes();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data
            ? err.response.data
            : "Failed to remove Food Type !!",
          TOAST_PROP
        );
      });
  }

  return (
    <Container>
      <Row xs={1} md={2} className="my-4">
        <Col className="my-3">
          <Form onSubmit={handleSubmit} className="px-4">
            <h3 className="fw-semibold text-primary">Add Food Type</h3>
            <FormControl
              className="my-3 shadow-sm"
              type="text"
              placeholder="Enter food Type"
              value={foodType}
              onChange={handleChange}
            />
            <small className="my-4 text-danger">{error}</small>
            <div className="d-flex justify-content-end w-100">
              <Button variant="secondary" className="my-3" type="submit">
                Add
              </Button>
            </div>
          </Form>
        </Col>
        <Col className="px-3 my-3">
          <h3 className="fw-semibold text-primary">Added Food types</h3>
          <Table striped responsive>
            <thead>
              <tr className="text-center text-capitalize text-info">
                <th>Id</th>
                <th>Food Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {foodTypes?.map((foodType) => (
                <tr key={foodType.id} className="text-center text-capitalize">
                  <td>{foodType.id}</td>
                  <td>{foodType.foodType}</td>
                  <td>
                    <AiFillDelete
                      as={Button}
                      size={"1.3rem"}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(foodType.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

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
  deleteCity,
  getAllCities,
} from "../../../api/adminService";
import { TOAST_PROP } from "../../../App";
import { AiFillDelete } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";

export default function AddCity() {
  const [city, setCity] = useState("");

  const [cities, setCities] = useState([]);

  const [error, setError] = useState("");

  const loadAllCities = () =>
    getAllCities()
      .then((res) => setCities(res.data))
      .catch((err) => console.log(err));

  useState(() => {
    loadAllCities();
  }, []);

  const handleChange = (e) => {
    if (e.target.value.match(/[0-9]/)) {
      setError("*City name must be alpahbetical characters only!!");
      return;
    }
    setCity(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const cityData = { name: city };
    toast
      .promise(
        createCity(cityData),
        {
          pending: "Adding...",
          success: "City added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res);
        loadAllCities();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add city!!", TOAST_PROP);
      });
    setCity("");
  }

  function handleDelete(id) {
    toast
      .promise(
        deleteCity(id),
        {
          pending: "Removing...",
          success: "City removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = cities.filter((city) => city.id !== id);
        setCities(newArr);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to remove City!!",
          TOAST_PROP
        );
      });
  }

  return (
    <Container>
      <Row xs={1} md={2} className="my-4">
        <Col className="my-3">
          <Form onSubmit={handleSubmit} className="px-4">
            <h3 className="fw-semibold text-primary">Add City</h3>
            <FormControl
              className="my-3 shadow-sm"
              type="text"
              placeholder="Enter city"
              value={city}
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
          <h3 className="fw-semibold text-primary">Added Cities</h3>
          <Table striped responsive>
            <thead>
              <tr className="text-center text-capitalize text-info">
                <th>City Id</th>
                <th>City Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cities?.map((city) => (
                <tr key={city.id} className="text-center text-capitalize">
                  <td>{city.id}</td>
                  <td>{city.name}</td>
                  <td>
                    <AiFillDelete
                      as={Button}
                      size={"1.3rem"}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(city.id)}
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

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
  createArea,
  deleteArea,
  getAllArea,
  getAllCities,
} from "../../../api/adminService";
import { TOAST_PROP } from "../../../App";
import { AiFillDelete } from "react-icons/ai";

export default function AddArea() {
  const [input, setInput] = useState({
    cityId: "",
    area: "",
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState("");

  const loadAllCities = () =>
    getAllCities()
      .then((res) => setCities(res.data))
      .catch((err) => console.log(err));

  const loadAllAreas = () =>
    getAllArea()
      .then((res) => setAreas(res.data))
      .catch((err) => console.log(err));

  useState(() => {
    loadAllCities();
    loadAllAreas();
  }, []);

  function handleChange(e) {
    if (e.target.value.match(/[0-9]/)) {
      setError("*Area name must be alpahbetical characters only!!");
      return;
    }
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const areaData = { name: input.area };
    toast
      .promise(
        createArea(input.cityId, areaData),
        {
          pending: "Adding...",
          success: "Area added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res);
        loadAllAreas();
      }).catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to add area!!",
          TOAST_PROP
        );
      });
    setInput({ cityId: "", area: "" });
  }

  function handleDelete(id) {
    toast
      .promise(
        deleteArea(id),
        {
          pending: "Removing...",
          success: "Area removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = areas.filter((area) => area.id !== id);
        setAreas(newArr);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to remove Area!!",
          TOAST_PROP
        );
      });
  }

  return (
    <Container>
      <Row xs={1} md={2} className="my-4">
        <Col>
          <h3>Add Area</h3>
          <Form onSubmit={handleSubmit}>
            <FormControl
              name="cityId"
              as={"select"}
              className="my-3 text-center text-capitalize"
              value={input.cityId}
              onChange={handleChange}
            >
              <option hidden>--select city--</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </FormControl>
            <FormControl
              name="area"
              className="my-3"
              type="text"
              placeholder="Enter Area Name"
              value={input.area}
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
        <Col>
          <h3>Added Areas</h3>
          <Table>
            <thead>
              <tr className="text-center text-capitalize">
                <th>Area Id</th>
                <th>City</th>
                <th>Area Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {areas?.map((area) => (
                <tr key={area.id} className="text-center text-capitalize">
                  <td>{area.id}</td>
                  <td>{area.city.name}</td>
                  <td>{area.name}</td>
                  <td>
                    <AiFillDelete
                      as={Button}
                      size={"1.3rem"}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(area.id)}
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

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { createAssignment, getAllNgos } from "../../../api/ngoService";
import { getSingleRequestedFood } from "../../../api/MemberService";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";

const AssignNgo = () => {
  const param = useParams();

  const id = param.id;

  const navigate = useNavigate();

  const [requestFood, setRequestFood] = useState("");
  const [ngos, setNgos] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  // State to store the selected NGO and delivery details
  const [selectedNGO, setSelectedNGO] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    getSingleRequestedFood(id)
      .then((res) => setRequestFood(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    getAllNgos()
      .then((res) => setNgos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAssignNgo = (e) => {
    e.preventDefault();
    toast
      .promise(
        createAssignment(
          {
            deliveryDate,
            foodItems: JSON.stringify(items),
            deliveryAddress: `${deliveryAddress}, ${requestFood.city}`,
          },
          selectedNGO,
          id
        ),
        {
          pending: "Assigning...",
          success: "NGO aasigned successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res.data);
        // navigate("/admin/all-assignments");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.reponse.data ? err.reponse.data : "Failed to assign NGO!!"
        );
      });
  };

  return (
    <Container className="p-4">
      <Card className="border shadow-sm">
        <Card.Header className="fs-4 bg-primary p-1 text-center text-light text-capitalize">
          Assign NGO for request - #{requestFood.id?.toUpperCase()}
        </Card.Header>
        <Card.Body>
          <h5 className="text-capitalize mb-3">
            Request: {requestFood.description}
          </h5>
          <Form onSubmit={handleAssignNgo}>
            <Row>
              <Col>
                <Form.Label>Item</Form.Label>
                <Form.Control
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Action</Form.Label>
                <br />
                <Form.Control
                  type="button"
                  value="Add"
                  className="w-25 btn btn-primary"
                  onClick={() => {
                    setItems((prev) => [...prev, { item, quantity }]);
                  }}
                />
              </Col>
            </Row>

            <div className="w-100 my-3">
              {items.map((element, i) => (
                <p key={i} className="d-flex align-items-center gap-3">
                  <span>Item : {element.item}</span>
                  <span>Quantity : {element.quantity}</span>
                  <AiFillDelete
                    role="button"
                    color="red"
                    size="1.1rem"
                    onClick={() => {
                      const newArr = items.filter(
                        (item) => item.item !== element.item
                      );
                      setItems(newArr);
                    }}
                  />
                </p>
              ))}
            </div>

            <Form.Group className="my-3">
              <Form.Label>Select NGO:</Form.Label>
              <Form.Control
                as="select"
                value={selectedNGO}
                onChange={(e) => setSelectedNGO(e.target.value)}
                className="text-capitalize text-center"
              >
                <option value="">--Select an NGO--</option>
                {ngos.map((ngo) => (
                  <option key={ngo.id} value={ngo.id}>
                    {ngo.name + ", " + ngo.city}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Delivery Date:</Form.Label>
              <Form.Control
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Delivery Address:</Form.Label>
              <Form.Control
                type="text"
                value={deliveryAddress || requestFood.address}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>City:</Form.Label>
              <Form.Control type="text" disabled value={requestFood.city} />
            </Form.Group>

            <div className="mt-4 d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Assign NGO
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AssignNgo;

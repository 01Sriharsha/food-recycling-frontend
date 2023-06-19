import React, { useEffect, useRef, useState } from "react";
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

  const ref = useRef();

  const [requestFood, setRequestFood] = useState({});
  const [ngos, setNgos] = useState([]);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  // State to store the selected NGO and delivery details
  const [selectedNGO, setSelectedNGO] = useState("");
  const [deliveryDate, setDeliveryDate] = useState({
    date: "",
    month: "",
    year: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [currentMonth] = useState(new Date().getMonth());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const validate = () => {
    console.log(deliveryAddress.length);
    console.log(deliveryDate.date.length);
    console.log(deliveryDate.month.length);
    console.log(deliveryDate.year.length);
    console.log(selectedNGO.length);
    if (
      ref.current?.value.length === 0 ||
      deliveryDate.date.length === 0 ||
      deliveryDate.month.length === 0 ||
      deliveryDate.year.length === 0 ||
      selectedNGO.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    return true;
  };

  console.log(ref.current?.value);

  const handleAssignNgo = (e) => {
    e.preventDefault();
    if (!validate()) return;
    toast
      .promise(
        createAssignment(
          {
            deliveryDate: `${deliveryDate.date}-${deliveryDate.month}-${deliveryDate.year}`,
            foodItems: JSON.stringify(items),
            deliveryAddress: `${deliveryAddress || requestFood.address}, ${
              requestFood.city
            }`,
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

  function generateDate() {
    const dateArray = [];

    for (let i = 0; i < 20; i++) {
      const date = new Date();
      dateArray.push(date.getDate() + i);
    }
    return dateArray;
  }

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
              <div className="d-flex gap-3">
                <Form.Control
                  as="select"
                  className="text-center text-capitalize"
                  value={deliveryDate.date}
                  onChange={(e) =>
                    setDeliveryDate({ ...deliveryDate, date: e.target.value })
                  }
                >
                  <option hidden>--select date--</option>
                  {generateDate()
                    .filter((date) => date <= 31)
                    .map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control
                  as="select"
                  value={deliveryDate.month}
                  className="text-center text-capitalize"
                  onChange={(e) =>
                    setDeliveryDate({ ...deliveryDate, month: e.target.value })
                  }
                >
                  <option hidden>--select month--</option>
                  {monthNames.map((month, i) => (
                    <option
                      key={month}
                      value={i + 1}
                      disabled={i < currentMonth}
                    >
                      {month}
                    </option>
                  ))}
                </Form.Control>

                <Form.Control
                  as="select"
                  className="text-center text-capitalize"
                  value={deliveryDate.year}
                  onChange={(e) =>
                    setDeliveryDate({ ...deliveryDate, year: e.target.value })
                  }
                >
                  <option hidden>--select year--</option>
                  {Array.from({ length: 5 }).map((e, i) => (
                    <option key={i} value={new Date().getFullYear() + i}>
                      {new Date().getFullYear() + i}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Delivery Address:</Form.Label>
              <Form.Control
                ref={ref}
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

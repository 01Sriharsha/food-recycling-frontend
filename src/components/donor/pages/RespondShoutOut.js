import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateShoutOut } from "../../../api/adminService";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";

export default function RespondShoutOut({ show, toggle, shoutoutObj , loadAllShoutOuts }) {
  const context = CustomContext();

  const navigate = useNavigate();

  const donor = context?.user;

  function handleClick() {
    toast
      .promise(
        updateShoutOut(donor.id, shoutoutObj.id, {
          ...shoutoutObj,
          responded: true,
        }),
        {
          pending: "Responding...",
          success: "Thank you for responding!! You will be contacted soon!",
          error: "Failed to respond to shoutout!!",
        },
        TOAST_PROP
      )
      .then(() => {
        toggle();
        navigate("/donor/all-shoutouts");
        loadAllShoutOuts();
      });
  }

  return (
    <Modal show={show} onHide={toggle} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-info">
          Respond Shoutout ({shoutoutObj.id})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row md={2}>
            <Col className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                disabled
                className="text-capitalize"
                defaultValue={donor?.name}
              />
            </Col>
            <Col className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control disabled defaultValue={donor?.email} />
            </Col>
            <Col className="my-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control disabled defaultValue={donor?.phone} />
            </Col>
            <Col className="my-2">
              <Form.Label>Food Type</Form.Label>
              <Form.Control disabled defaultValue={shoutoutObj?.foodType} />
            </Col>
            <Col className="my-2">
              <Form.Label>Food Item</Form.Label>
              <Form.Control
                disabled
                className="text-capitalize"
                defaultValue={shoutoutObj?.foodItem}
              />
            </Col>
            <Col className="my-2">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                disabled
                defaultValue={shoutoutObj?.quantity + " Kg"}
              />
            </Col>
            <Col className="my-2">
              <Form.Label>Pick Up Address</Form.Label>
              <Form.Control disabled defaultValue={donor?.address} />
            </Col>
            <Col className="my-2">
              <Form.Label>City</Form.Label>
              <Form.Control disabled defaultValue={donor?.city} />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

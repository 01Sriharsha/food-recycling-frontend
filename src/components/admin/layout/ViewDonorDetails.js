import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export default function ViewDonorDetails({ show, toggle, donorObj }) {

    const donor = donorObj;

  return (
    <Modal show={show} onHide={toggle} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-info">
          Donor Details
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
        <Button variant="primary" onClick={toggle}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

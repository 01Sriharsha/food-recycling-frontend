import React from "react";
import { Button, Col, Collapse, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function QuickActions({ open, toggle, Quick_Links }) {
  return (
    <Container fluid>
      <Row>
        <Col
          md={2}
          className="fw-bolder text-info d-flex justify-content-center align-items-center"
        >
          <Button variant="info" className="btn-sm my-2" onClick={toggle}>
            Quick Actions
          </Button>
        </Col>
        <Col md={10}>
          <Collapse in={open}>
            <div>
              <Row md={5} xs={3} sm={4}>
                {Quick_Links.map((element, index) => {
                  return (
                    <Col className="my-2">
                      <Link
                        key={index}
                        to={element.link}
                        className={`my-2 text-decoration-none text-dark`}
                      >
                        {element.label}
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Collapse>
        </Col>
      </Row>
    </Container>
  );
}

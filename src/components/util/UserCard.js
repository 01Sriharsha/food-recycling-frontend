import React, { useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { verifyNgo } from "../../api/ngoService";
import { TOAST_PROP } from "../../App";

export default function UserCard({ user }) {
  const [status, setStatus] = useState(user.status || "");

  const handleVerification = () => {
    toast
      .promise(
        verifyNgo(user.id),
        {
          pending: "Verification in progress...",
          success: "Verified successfully",
        },
        TOAST_PROP
      )
      .then((res) => setStatus("Verified"))
      .catch((err) => {
        console.log(err);
        toast.error("Verification failed!!", TOAST_PROP);
      });
  };

  return (
    <Card className="w-100 my-3 rounded shadow p-1 border-primary">
      <Card.Body className="text-capitalize">
        <div>
          <Row className="my-2">
            <Col md={4} className="fw-semibold text-info">
              {user.user} Id :
            </Col>
            <Col md={8}>{user.id}</Col>
          </Row>
          <Row className="my-2">
            <Col md={4} className="fw-semibold text-info">
              Name :
            </Col>
            <Col md={8}>{user.name}</Col>
          </Row>
          <Row className="my-2">
            <Col md={4} className="fw-semibold text-info">
              Email :
            </Col>
            <Col md={8} className="text-lowercase">
              {user.email}
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={4} className="fw-semibold text-info">
              phone :
            </Col>
            <Col md={8}>{user.phone}</Col>
          </Row>
          <Row className="my-2">
            <Col md={4} className="fw-semibold text-info">
              address :
            </Col>
            <Col md={8}>{user.address}</Col>
          </Row>
          <Row className="my-2">
            <Col md={4} className="fw-semibold text-info">
              city :
            </Col>
            <Col md={8}>{user.city}</Col>
          </Row>
        </div>
      </Card.Body>
      <div
        className={`w-100 d-flex ${
          user.user === "ngo"
            ? "justify-content-between"
            : "justify-content-end"
        } 
        align-items-center px-3 pb-2`}
      >
        {user.user === "ngo" && (
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <div className="d-flex justify-content-center gap-2 align-items-center">
              <span className="">Account Status : &nbsp;</span>
              <span
                className={`fw-bold text-capitalize ${
                  status === "pending" ? "text-warning" : "text-success"
                }`}
              >
                {status}
              </span>
            </div>
            {status === "pending" && (
              <Badge
                role="button"
                pill
                size="sm"
                className="bg-success"
                onClick={handleVerification}
              >
                Verify
              </Badge>
            )}
          </div>
        )}
        <Button
          variant="secondary"
          className="btn-sm d-flex align-items-center gap-1"
        >
          <span>Delete</span>
          <AiFillDelete />
        </Button>
      </div>
    </Card>
  );
}

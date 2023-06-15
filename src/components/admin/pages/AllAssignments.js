import React, { useEffect, useState } from "react";
import { CustomContext } from "../../../context/AuthContext";
import {
  deleteAssignment,
  getAllAssignments,
  getAllAssignmentsByNgo,
  updateAcceptanceStatus,
  updateDeliveryStatus,
} from "../../../api/ngoService";
import { Button, Card, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";
import { BsFillBasketFill } from "react-icons/bs";
import ViewFoodItems from "../../donor/util/ViewFoodItems";

const AllAssignments = () => {
  const user = CustomContext()?.user;

  const [assignments, setAssignments] = useState([]);

  const [foodItems, setFoodItems] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  
  const loadAssignments = () => {
    const promise =
      user === "admin" ? getAllAssignments() : getAllAssignmentsByNgo(user.id);
    promise
      .then((res) => {
        console.log(res.data);
        setAssignments(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAssignments();
  }, [user]);

  const updateAcceptance = (acceptance, assignment) => {
    toast
      .promise(
        updateAcceptanceStatus({ acceptance }, assignment.id),
        { pending: "Updating...." },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res.data);
        loadAssignments();
        res.data?.includes("accepted")
          ? toast.success(res.data, TOAST_PROP)
          : toast.info(res.data, TOAST_PROP);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.reponse.data
            ? err.reponse.data
            : "Failed to update the acceptance!!",
          TOAST_PROP
        );
      });
  };

  const updateDelivery = (assignment) => {
    toast
      .promise(
        updateDeliveryStatus(assignment.id),
        {
          pending: "Updating...",
          success: "Delivery status updated successfully!!",
        },
        TOAST_PROP
      )
      .then(() => loadAssignments())
      .catch((err) => {
        console.log(err);
        toast.error(
          err.reponse.data
            ? err.reponse.data
            : "Failed to update the delivery status!!",
          TOAST_PROP
        );
      });
  };

  const removeAssignment = (assignment) => {
    toast
      .promise(deleteAssignment(assignment.id))
      .then((res) => loadAssignments())
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Card>
        <Card.Header className="fs-4 text-center bg-primary text-light">
          {user === "admin" ? "All" : "My"} Assignments
        </Card.Header>
        <Card.Body>
          <Table hover responsive striped>
            <thead>
              <tr className="text-center text-capitalize text-info">
                <th>ID</th>
                {user === "admin" && (
                  <>
                    <th>NGO</th>
                    <th>Phone</th>
                  </>
                )}
                <th>Request ID</th>
                <th>Food Items</th>
                <th>Delivery Date</th>
                <th>Delivery Address</th>
                <th>{user === "admin" ? "Action" : "Acceptance"}</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="text-center text-capitalize">
                  <td>{assignment.id}</td>
                  {user === "admin" && (
                    <>
                      <td>{assignment?.ngo?.name}</td>
                      <td>{assignment?.ngo?.phone}</td>
                    </>
                  )}
                  <td>{assignment?.requestFood?.id}</td>
                  <td>
                    <BsFillBasketFill
                      role="button"
                      color="green"
                      onClick={() => {
                        setFoodItems(JSON.parse(assignment?.foodItems));
                        toggle();
                      }}
                      size="1.3rem"
                    />
                    <ViewFoodItems
                      show={show}
                      toggle={toggle}
                      foodItems={foodItems}
                    />
                  </td>
                  <td>{assignment.deliveryDate}</td>
                  <td>{assignment.deliveryAddress}</td>
                  <td>
                    {user.user === "ngo" ? (
                      <div className="d-flex justify-content-center gap-3 align-items-center">
                        {assignment.acceptance === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() =>
                                updateAcceptance("accepted", assignment)
                              }
                            >
                              accept
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                updateAcceptance("rejected", assignment)
                              }
                            >
                              reject
                            </Button>
                          </>
                        ) : (
                          <span
                            className={`fw-bold ${
                              assignment.acceptance === "accepted" &&
                              "text-success"
                            } ${
                              assignment.acceptance === "rejected" &&
                              "text-danger"
                            }`}
                          >
                            {assignment.acceptance}
                          </span>
                        )}
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={assignment.acceptance !== "pending"}
                        onClick={() => removeAssignment(assignment)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                  <td>
                    {assignment.acceptance === "pending" &&
                    !assignment.delivered ? (
                      "-"
                    ) : assignment.delivered ? (
                      <span className="text-success fw-bold">Delivered</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => updateDelivery(assignment)}
                      >
                        Delivered
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AllAssignments;

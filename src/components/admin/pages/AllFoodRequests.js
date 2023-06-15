import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getAllRequestedFoods,
  getAllRequestedFoodsByMember,
  updateRequestFood,
} from "../../../api/MemberService";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";
import FilterByStatus from "../../util/FilterByStatus";
import { Link } from "react-router-dom";

export default function AllFoodRequests() {
  const context = CustomContext();

  const user = context?.user;

  console.log("hello");

  const [allData, setAllData] = useState([]);

  const [requestedFoods, setRequestedFoods] = useState([]);

  const loadAllRequestedFoods = () =>
    getAllRequestedFoods()
      .then((res) => {
        setRequestedFoods(res.data);
        setAllData(res.data);
      })
      .catch((err) => console.log(err));

  const loadAllRequestedFoodsByMember = () =>
    getAllRequestedFoodsByMember(user?.id)
      .then((res) => {
        setRequestedFoods(res.data);
        setAllData(res.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    //check whether the user is admin or member
    if (user === "admin" || user.user === "ngo") loadAllRequestedFoods();
    else loadAllRequestedFoodsByMember();
  }, []);

  const updateStatus = (status, requestObj) => {
    //Todo: spread 'requestObj' so that existing data shouldn't modify
    const requestData = { ...requestObj, status: status };
    toast
      .promise(
        updateRequestFood(requestData, requestObj?.id),
        {
          pending: "Updating...",
          success: "Status Updated Successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res.data);
        loadAllRequestedFoods();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to update status!!",
          TOAST_PROP
        );
      });
  };

  function getTime(dateVal) {
    // console.log(dateVal);
    const date = new Date(dateVal);
    date.setHours(date.getHours() + 6, 0, 0, 0, 0);
    const currentDate = new Date();
    if (date <= currentDate) {
      return "Time Over";
    }
    return;
  }

  if (requestedFoods.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1 className="text-center text-info fw-bold">No Requests..!</h1>
      </div>
    );
  }
  return (
    <Container className="p-2" fluid>
      <Row md={2} xs={1} className="mx-0 my-1">
        <Col className="d-flex justify-content-center justify-content-md-start my-2">
          <h2 className="text-center fw-bold text-primary my-2">
            REQUESTED FOOD
          </h2>
        </Col>
        <Col className="d-flex justify-content-center justify-content-md-end my-2">
          <FilterByStatus
            allData={allData}
            array={requestedFoods}
            setArray={setRequestedFoods}
          />
        </Col>
      </Row>
      <Table className="mt-2" responsive>
        <thead>
          <tr className="text-center text-info">
            <th>Request Id</th>
            {(user === "admin" || user.user === "ngo") && (
              <>
                <th>Name</th>
                <th>Email</th>
              </>
            )}
            <th>Phone</th>
            <th>Food Type</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Address</th>
            <th>Status</th>
            {user === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {requestedFoods.map((request) => (
            <tr key={request.id} className="text-center text-capitalize">
              <td className="fw-semibold">{request.id}</td>
              {(user === "admin" || user.user === "ngo") && (
                <>
                  <td>{request?.member?.name}</td>
                  <td className="text-lowercase">{request?.member?.email}</td>
                </>
              )}
              <td>{request.phone}</td>
              <td>{request.foodType}</td>
              <td>{request.quantity}</td>
              <td>
                <textarea
                  disabled
                  rows={1}
                  className="text-dark text-center border-0"
                  value={request.description}
                />
              </td>
              <td>{`${request.address}, ${request.city}`}</td>
              <td
                className={` fw-bold
                        ${request.status === "pending" && "text-warning"}
                        ${request.status === "approved" && "text-success"}
                        ${request.status === "rejected" && "text-danger"}
                        ${request.status === "assigned" && "text-info"}
                    `}
              >
                {request.status}
              </td>

              {getTime(request.dateTime) === "Time Over" &&
              request.status === "pending" ? (
                <td>Time Over</td>
              ) : (
                <td>
                  {user === "admin" && (
                    <div className="d-flex justify-content-center gap-3">
                      {request.status === "approved" && (
                        <Button
                          as={!request.ngo && Link}
                          to={`/admin/request/${request.id}/assign-ngo`}
                          variant={!request.ngo && "primary"}
                          className="btn-sm text-capitalize"
                          onClick={() =>
                            toast.info(
                              `Donation assigned to ${request.ngo.name?.toUpperCase()} 
                                  for delivery`,
                              TOAST_PROP
                            )
                          }
                        >
                          {request.ngo ? request.ngo.name : "Assign"}
                        </Button>
                      )}
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="primary"
                            className="btn-sm"
                            // disabled={request.status !== "pending"}
                            //Todo: Pass the whole existing request obj while updating status
                            onClick={() => {
                              updateStatus("approved", request);
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="secondary"
                            className="btn-sm"
                            // disabled={request.status !== "pending"}
                            onClick={() => {
                              updateStatus("rejected", request);
                            }}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {(request.status === "rejected" ||
                        request.status === "assigned") &&
                        "-"}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

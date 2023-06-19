import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, FormText, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../api/adminService";
import {
  getAllDonations,
  getAllDonationsByDonor,
  updateDonation,
} from "../../../api/DonorService";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";
import FilterByStatus from "../../util/FilterByStatus";
import { HiDocumentDownload } from "react-icons/hi";
import ViewFoodItems from "../../donor/util/ViewFoodItems";
import { BsFillBasketFill } from "react-icons/bs";

export default function AllDonations() {
  const context = CustomContext();

  const user = context?.user;

  const [allData, setAllData] = useState([]);

  const [donations, setDonations] = useState([]);

  const [foodItems, setFoodItems] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  function loadAllDonations() {
    getAllDonations()
      .then((res) => {
        setAllData(res.data);
        setDonations(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadAllDonationsByDonor() {
    getAllDonationsByDonor(user.id)
      .then((res) => {
        setAllData(res.data);
        setDonations(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (user === "admin") loadAllDonations();
    else loadAllDonationsByDonor();
  }, [user]);

  const updateStatus = (status, donationObj) => {
    const donationData = { ...donationObj, status: status };
    toast
      .promise(
        updateDonation(donationData, donationObj?.id),
        {
          pending: "Updating...",
          success: "Status updated successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res);
        loadAllDonations();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to update Status",
          TOAST_PROP
        );
      });
  };

  if (donations.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1 className="text-center text-info fw-bold">No Donations..!</h1>
      </div>
    );
  }
  return (
    <Container fluid>
      <Row md={2} xs={1} className="mx-0 my-3">
        <Col className="d-flex justify-content-center justify-content-md-start my-2">
          <h2 className="text-center fw-bold text-primary my-2">
            {user === "admin" || user.user === "ngo"
              ? "ALL DONATIONS"
              : "YOUR CHARITY BOX"}
          </h2>
        </Col>
        <Col className="d-flex justify-content-center justify-content-md-end my-2">
          <FilterByStatus
            allData={allData}
            array={donations}
            setArray={setDonations}
          />
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr className="text-center text-info text-capitalize">
            <th>Donation Id</th>
            {user === "admin" && (
              <>
                <th>Donor Name</th>
                <th>Donor Phone</th>
              </>
            )}
            <th>Donor Type</th>
            <th>Donated Date</th>
            <th>Food Type</th>
            <th>Food Items</th>
            <th>Expiration Date</th>
            <th>Status</th>
            {(user === "admin" || user.user === "ngo") && (
              <>
                <th>Image</th>
                {user === "admin" && <th>Action</th>}
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => {
            return (
              <tr key={donation.id} className="text-center text-capitalize">
                <td className="fw-semibold">{donation.id}</td>
                {user === "admin" && (
                  <>
                    <td>{donation.donorName}</td>
                    <td>{donation.donor.phone}</td>
                  </>
                )}
                <td>{donation.donorType}</td>
                <td>{donation.date}</td>
                <td>{donation.foodType}</td>
                <td>
                  <BsFillBasketFill
                    role="button"
                    color="green"
                    onClick={() => {
                      setFoodItems(JSON.parse(donation?.foodItems));
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
                <td>{donation.expirationDate}</td>
                <td
                  className={` fw-bold
                                ${
                                  donation.status === "pending" &&
                                  "text-warning"
                                }
                                ${
                                  donation.status === "approved" &&
                                  "text-success"
                                }
                                ${
                                  donation.status === "rejected" &&
                                  "text-danger"
                                }
                                `}
                >
                  {donation.status}
                </td>
                {(user === "admin" || user.user === "ngo") && (
                  <>
                    <td>
                      {donation.imageName ? (
                        <Button
                          variant="xyz"
                          className="btn-sm"
                          as={Link}
                          to={
                            BASE_URL +
                            `/donations/${donation.id}/download/images`
                          }
                        >
                          <HiDocumentDownload color="purple" size={"1.4rem"} />
                        </Button>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {user === "admin"  ? (
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="primary"
                            className="btn-sm"
                            disabled={donation.status !== "pending"}
                            onClick={() => updateStatus("approved", donation)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="secondary"
                            className="btn-sm"
                            disabled={donation.status !== "pending"}
                            onClick={() => updateStatus("rejected", donation)}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted fw-bold">Expired</span>
                      )}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

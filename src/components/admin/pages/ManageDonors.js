import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllDonors } from "../../../api/DonorService";
import { TOAST_PROP } from "../../../App";
import UserCard from "../../util/UserCard";

export default function ManageDonors() {
  const [donors, setDonors] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(false);
    getAllDonors()
      .then((res) => setDonors(res.data))
      .catch((err) => {
        toast.error("Failed to load donors", TOAST_PROP);
      });
  }, [refresh]);

  console.log(donors);

  return (
    <Container>
      {donors.length !== 0 ? (
        <>
          <h1 className="w-100 text-center mt-3 mb-4 text-primary fw-semibold">
            ALL DONORS
          </h1>
          <Row md={2} className="m-0 w-100">
            {donors.map((donor) => (
              <Col key={donor.id} className="">
                <UserCard user={donor} setRefresh={setRefresh} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <h2 className="fw-bold text-info">No Members..!</h2>
        </div>
      )}
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAllNgos } from "../../../api/ngoService";
import UserCard from "../../util/UserCard";

export default function ManageNgos() {
  const [ngos, setNgos] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(false);
    getAllNgos()
      .then((res) => setNgos(res.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <Container>
      {ngos.length !== 0 ? (
        <>
          <h1 className="w-100 text-center mt-3 mb-4 text-primary fw-semibold">
            ALL NGO's
          </h1>
          <Row md={2} className="m-0 w-100">
            {ngos.map((ngo) => (
              <Col key={ngo.id} className="">
                <UserCard user={ngo} setRefresh={setRefresh} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <h2 className="fw-bold text-info">No users..!</h2>
        </div>
      )}
    </Container>
  );
}

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function NgoDashboard() {
  const { pathname } = useLocation();

  const Quick_Links = [
    { label: "View All Donations", link: "/ngo/all-donations" },
    { label: "View Requested Food", link: "/ngo/all-requests" },
    { label: "All Shoutout's", link: "/ngo/all-shoutouts" },
    { label: "My Assignments", link: "/ngo/all-assignments" },
  ];

  return (
    <div>
      {pathname === "/ngo" ? (
        <Container fluid className="admin-dashboard">
          <div className="position-absolute end-0 d-flex flex-column align-items-center gap-3 justify-content-center w-50 me-2">
            <h2 className="text-primary text-center fw-semibold mt-4">
              Quick Actions
            </h2>
            <Row
              md={2}
              className="w-75 flex justify-content-center"
              // style={{ border: "1px solid black" }}
            >
              <Col className="d-flex flex-column gap-2 my-2 border">
                {Quick_Links.map((route, index) => {
                  return (
                    <Button
                      key={index}
                      as={Link}
                      to={route.link}
                      className="w-100"
                      variant="secondary"
                    >
                      {route.label}
                    </Button>
                  );
                })}
              </Col>
            </Row>
          </div>
        </Container>
      ) : (
        <div>
          <div className="d-flex gap-5 align-items-center w-100 px-4 my-3">
            <span className="fs-6 fw-bolder">Quick Actions</span>
            <div className="d-flex flex-wrap gap-5 align-items-center w-75">
              {Quick_Links.map((route, index) => (
                <Link
                  key={index}
                  to={route.link}
                  className="text-decoration-none"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}

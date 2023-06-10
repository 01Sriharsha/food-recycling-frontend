import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import QuickActions from "../layout/QuickActions";

export default function AdminDashboard() {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const Quick_Links = [
    { label: "Add City", link: "/admin/add-cities" },
    { label: "Add Area", link: "/admin/add-areas" },
    { label: "Add Food Type", link: "/admin/food-types" },
    { label: "Manage Donors", link: "/admin/manage-donors" },
    { label: "Manage Members", link: "/admin/manage-members" },
    { label: "Manage NGO's", link: "/admin/manage-ngos" },
    { label: "Shoutout", link: "/admin/shoutout" },
    { label: "View All Donations", link: "/admin/all-donations" },
    { label: "View Requested Food", link: "/admin/all-requests" },
    { label: "View All Enquiries", link: "/admin/enquiries" },
    { label: "All Shoutout's", link: "/admin/all-shoutouts" },
    { label: "All Assignments", link: "/admin/all-assignments" },
  ];

  return (
    <div>
      {pathname === "/admin" ? (
        <Container fluid className="admin-dashboard">
          <div className="position-absolute end-0 d-flex flex-column align-items-center gap-3 justify-content-center w-50 me-2">
            <h2 className="text-primary text-center fw-semibold">
              Quick Actions
            </h2>
            <Row md={2} className="w-75">
              <Col className="d-flex flex-column gap-2 my-2">
                {Quick_Links.map((route, index) => {
                  if (index <= Math.floor(Quick_Links.length / 2)) {
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
                  } else return null;
                })}
              </Col>

              <Col className="d-flex flex-column gap-2 my-2">
                {Quick_Links.map((route, index) => {
                  if (index > Math.floor(Quick_Links.length / 2)) {
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
                  } else return null;
                })}
              </Col>
            </Row>
          </div>
        </Container>
      ) : (
        <div>
          <QuickActions open={open} toggle={toggle} Quick_Links={Quick_Links} />
          <Outlet />
        </div>
      )}
    </div>
  );
}

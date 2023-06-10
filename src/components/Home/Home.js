import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllDonations } from "../../api/DonorService";
import { bgImages } from "../../assets/assets";
import { CustomContext } from "../../context/AuthContext";
import Faq from "./Faq";
import Footer from "./Footer";

export default function Home() {
  const context = CustomContext();

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getAllDonations()
      .then((res) => {
        setDonations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="border-secondary bg-light" style={{ minHeight: "90vh" }}>
      <Row className="m-0" style={{ width: "100%" }}>
        <Col md={6} className="m-0 p-0">
          <Carousel
            fade
            variant="light"
            interval={2000}
            controls={false}
            pause={false}
            className="p-0 m-0 w-100"
          >
            {bgImages.map((img, index) => (
              <Carousel.Item key={index} className="">
                <div className="d-flex justify-content-center rounded">
                  <img
                    src={img}
                    alt={`pic${index}`}
                    width={"90%"}
                    className="rounded"
                    style={{ background: "rgba(0, 0, 0, .6)", height: "90vh" }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <main className="h-100 px-3 d-flex justify-content-center flex-column">
            <h1 className="text-primary tracking-in-expand">
              Welcome to our Food Recycling Project
            </h1>
            <p>
              Our mission is to reduce food waste and help those in need by
              collecting surplus food from restaurants and delivering it to
              local charities and shelters.
            </p>
            <h3 className="">Get Involved</h3>
            <p>
              We rely on the support of volunteers and donors to make our
              project a success. If you're interested in helping out, please
              sign up for our newsletter or make a donation.
            </p>
            <p>
              We also welcome donations of non-perishable food items, such as
              canned goods and dry pasta, as well as kitchen and cooking
              supplies.
            </p>
            <div className="d-flex justify-content-start gap-3 mt-2">
              {!context?.isAuthenticated && (
                <Button variant="secondary" as={Link} to="/register">
                  Register
                </Button>
              )}
              <Button variant="primary" as={Link} to="/donate">
                Donate
              </Button>
            </div>
          </main>
        </Col>
      </Row>

      <Container>
        <Row md={1} className="mx-0 my-3 p-3">
          <Col className="p-2">
            <h2 className="text-info fw-bold">How it works</h2>
            <p>
              We partner with local restaurants and cafes to collect their
              surplus food. Our volunteers pick up the food and deliver it to
              local charities and shelters, where it can be used to feed people
              in need.
            </p>
            <p>
              We also work with food banks and other organizations to distribute
              food to individuals and families who are experiencing food
              insecurity.
            </p>
            <Button as={Link} to="/about" variant="secondary">
              Learn More
            </Button>
          </Col>
        </Row>
        <Row className="mx-0 my-3 p-3">
          <Col>
            <h2 className="text-info fw-bold">Recent Donations</h2>
            <Carousel variant="dark">
              {donations
                .filter((donation) => donation.status === "approved")
                .slice(0,10)
                .map((donation) => (
                  <Carousel.Item
                    key={donation.id}
                    className="px-3 py-5"
                    interval={700}
                  >
                    <div className="d-flex justify-content-center">
                      <Card className="w-75 shadow">
                        <Card.Body>
                          <Card.Title className="text-capitalize fw-semibold">
                            {donation.donorName} Donates {donation.quantity} of
                            Food
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {donation.date}
                          </Card.Subtitle>
                          <Card.Text>
                            Thanks to the generosity of the folks at &nbsp;
                            <span className="text-capitalize text-info">
                              {donation.donorName}
                            </span>
                            , we were able to collect &nbsp;
                            <span className="text-info">
                              {JSON.parse(donation.foodItems).map((e) => (
                                <>
                                  <span> {e.quantity} of </span>
                                  <span className="text-capitalize ">{e.item} ,</span>
                                </>
                              ))}
                            </span>{" "}
                            to local charities , shelters and etc,.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
        </Row>
        <Row md={2} className="p-3 my-3">
          <Col>
            <h2 className="text-info fw-bold my-2">FAQ</h2>
            <Faq />
          </Col>
          <Col>
            <div className="faq-bg"></div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

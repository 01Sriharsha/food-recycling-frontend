import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='p-3'>
      <Container>
        <Row>
          <Col md={7}>
            <h5 className='text-info fw-semibold'>About Us</h5>
            <p>
              We partner with every individuals ,  local restaurants , marriage halls and cafes to collect their surplus food.Our volunteers pick up the food and deliver it to local charities and shelters, where it can be used to feed people in need &nbsp;
              <Link to="/about">Read More</Link>
            </p>
          </Col>
          <Col md={5}>
            <h5 className='text-info fw-semibold'>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Madhuvana Layout, Srirampura</li>
              <li>Phone: +91 7899 900 248</li>
              <li>Email: computerparadise1993@gmail.com</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-muted text-center mt-4 mb-0">
              &copy; 2023 Food Recycle. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <div>
            <div className="m-0 contact">
                <Container className='w-75 pt-5'>
                    <Card className='shadow'>
                        <Card.Header>
                            <h2 className="text-center text-info fw-bolder">Contact Us</h2>
                        </Card.Header>
                        <Card.Body>
                            <div className='my-2'>
                                <p className="text-center">For more information about our food recycling project, please contact us using the information below:</p>
                            </div>
                            <div className='w-100 d-flex justify-content-center align-items-center  flex-column'>
                                <div className='d-flex gap-2'>
                                    <p className="text-info fw-bold"> Email:</p>
                                    <p className=''> info@foodrecyclingproject.com</p>
                                </div>
                                <div className='d-flex gap-2'>
                                    <p className="text-info fw-bold"> Phone:</p>
                                    <p className=''>+91 7899 900 248</p>
                                </div>
                                <div className='d-flex gap-2'>
                                    <p className="text-info fw-bold"> Address:</p>
                                    <p> BEML Nagar , Mysuru</p>
                                </div>
                            </div>
                            <div className="text-center my-2">
                                <p>
                                    We welcome your questions, feedback, and suggestions, and we are always looking for new partners and volunteers to help us reduce food waste and address food insecurity in our community.
                                </p>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-end">
                                <Button as={Link} to="/register" className='btn-sm'>
                                    Register Now
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default ContactUs;

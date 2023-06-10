import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <div className='about'>
            <Accordion defaultActiveKey="0" className='w-75 mx-auto p-2'>
                <Accordion.Item eventKey="0" className='my-3'>
                    <Accordion.Header>
                        <div className='w-100 text-center text-info fw-bolder'>How Do We Work ?</div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                We partner with every individuals ,  local restaurants , marriage halls and cafes to collect their surplus food. .
                            </li>
                            <li>
                                Our volunteers pick up the food and deliver it to local charities and shelters, where it can be used to feed people in need
                            </li>
                            <li>
                                We also work with food banks and other organizations to distribute food to individuals and families who are experiencing food insecurity.
                            </li>
                            <li>
                                Additionally, we work with food banks and other organizations to distribute food to individuals and families who are experiencing food insecurity.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className='my-3'>
                    <Accordion.Header>
                        <div className='w-100 text-center text-info fw-bolder'>Our Moto</div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                We believe that everyone should have access to nutritious food, and by rescuing surplus food, we are able to provide for those who may not have the means to access it themselves.
                            </li>
                            <li>
                                At the same time, we are reducing the amount of food that ends up in landfills and contributing to environmental degradation.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='my-3'>
                    <Accordion.Header>
                        <div className='w-100 text-center text-info fw-bolder'>Our Team</div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                Our project is powered by a team of dedicated volunteers who are passionate about making a difference in their community.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className='my-3'>
                    <Accordion.Header>
                        <div className='w-100 text-center text-info fw-bolder'>Join Us</div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>
                                If you are interested in learning more about our project or would like to get involved as a volunteer or partner, please don't hesitate to contact us. Together, we can make a positive impact on both the environment and our community.
                            </li>
                        </ul>
                        <div className='d-flex justify-content-end w-100'>
                            <Button as={Link} to="/contact" variant="primary" className="btn-sm">
                                Contact Us
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
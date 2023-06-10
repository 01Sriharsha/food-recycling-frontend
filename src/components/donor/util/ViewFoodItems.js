import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ViewFoodItems({ show, toggle, foodItems }) {
  
    return (
        <>
            <Modal
                show={show}
                onHide={toggle}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold text-primary'>Food Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover>
                        <thead>
                            <tr className='text-center fw-bold text-info'>
                                <th>Items</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foodItems.map((food, index) => (
                                    <tr key={index} className='text-center text-capitalize'>
                                        <td>{food.item}</td>
                                        <td>{food.quantity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggle}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
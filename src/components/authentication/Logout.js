import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomContext } from '../../context/AuthContext';

export default function Logout({ show, toggle }) {

    const context = CustomContext()

    return (
        <>
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        NO
                    </Button>
                    <Button variant="primary" onClick={() => {
                        context?.logout();
                        toggle();
                    }}>
                        YES
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
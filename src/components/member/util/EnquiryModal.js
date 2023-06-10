import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { createNewEnquiry, updateEnquiry } from '../../../api/MemberService';
import { TOAST_PROP } from '../../../App';
import { CustomContext } from '../../../context/AuthContext';

export default function EnquiryModal({ show, toggle, setRefresh, enquiryObj }) {

    const context = CustomContext();

    const user = context?.user;

    const [input, setInput] = useState('');

    function handleUpdate() {
        if (input.length === 0 || input.trim().length===0) {
            toast.error("Field cannot be empty!!", TOAST_PROP);
            return;
        }
        const enquiryData = { ...enquiryObj, reply: input, status: "replied" }

        toast.promise(updateEnquiry(enquiryData, enquiryObj?.id), {
            pending: 'Updating...',
            success: 'Enquiry updated successfully!!'
        }, TOAST_PROP)
            .then(res => {
                toggle();
                setInput('')
                setRefresh(true)
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data ? err.response.data :"Failed to update the enquiry", TOAST_PROP);
            })
    }

    function handleClick() {
        if (input.length === 0 || input.trim().length===0) {
            toast.error("Field cannot be empty!!", TOAST_PROP);
            return;
        }
        const enquiryData = { message: input }

        toast.promise(createNewEnquiry(enquiryData, user?.id), {
            pending: 'Posting...',
            success: 'Enquiry posted successfully!!'
        }, TOAST_PROP)
            .then(res => {
                toggle();
                setInput('')
                setRefresh(true)
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data ? err.response.data :"Failed to post the enquiry", TOAST_PROP);
            })
    }

    return (
        <Modal show={show} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title className='text-info fw-bold'>
                    {user === "admin" ? "Reply" : "Enquiry"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type='text'
                    as="textarea"
                    placeholder='Type here...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggle}>
                    Close
                </Button>
                <Button variant="primary"
                    onClick={() => (user === "admin") ? handleUpdate() : handleClick()}
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
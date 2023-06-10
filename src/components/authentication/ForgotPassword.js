import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../api/adminService';
import { TOAST_PROP } from '../../App';

export default function ForgotPassword({ show, toggle, userType, userId }) {

    const [inputVal, setInputVal] = useState({
        newPassword: '', confirmPassword: ''
    })

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setInputVal(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const validate = () => {
        if (inputVal.newPassword?.length === 0
            || inputVal.confirmPassword?.length === 0) {
            toast.error("Fileds cannot be empty!!", TOAST_PROP);
            setError(true);
            return false;
        }

        if (inputVal.newPassword !== inputVal.confirmPassword) {
            toast.error("Confirm Password doesn't match!!", TOAST_PROP);
            setError(true);
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const passwordData = {
            userType: userType,
            userId: userId,
            newPassword: inputVal.newPassword
        }
        toast.promise(forgotPassword(passwordData), {
            pending: "Resetting....",
            success: "Password reset successfully!!"
        }, TOAST_PROP)
            .then(res => {
                toggle()
                handleReset()
            }).catch(err => {
                console.log(err);
                setError(true)
                toast.error(err.response.data ? err.response.data : "Failed to reset password", TOAST_PROP)
            })
    }

    const handleReset = () => setInputVal({ newPassword: '', confirmPassword: '' })

    return (
        <Modal
            show={show}
            onHide={toggle}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-primary fw-semibold'>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-evenly'>
                    <span className='text-info fw-semibold text-capitalize'>User : {userType} </span>
                    <span className='text-info fw-semibold'>User Id : {userId}</span>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='my-2'>
                        <Form.Label htmlFor='newPassword' className='text-info'>
                            New Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder='Enter new password'
                            value={inputVal.newPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label htmlFor='confirmPassword' className='text-info'>
                            Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder='Confirm password'
                            value={inputVal.confirmPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggle}>
                    Close
                </Button>
                <Button type="submit" variant="primary" onClick={(e) => {
                    handleSubmit(e)
                    !error && toggle() //toggle when there is no error
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { deleteEnquiry, getAllEnquiries, getAllEnquiriesByMember } from '../../../api/MemberService'
import { CustomContext } from '../../../context/AuthContext';
import EnquiryModal from '../util/EnquiryModal';
import { AiFillDelete } from 'react-icons/ai'
import { ImReply } from 'react-icons/im'
import { toast } from 'react-toastify';
import { TOAST_PROP } from '../../../App';

export default function AllEnquiries() {

    const context = CustomContext();

    const user = context?.user

    const [enquiries, setEnquiries] = useState([]);

    const [refresh, setRefresh] = useState(false)

    const [enquiryObj, setEnquiryObj] = useState(null);

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);


    const loadAllEnquiriesByMember = () => getAllEnquiriesByMember(user?.id)
        .then(res => setEnquiries(res.data))
        .catch(err => console.log(err))

    const loadAllEnquiries = () => getAllEnquiries()
        .then(res => setEnquiries(res.data))
        .catch(err => console.log(err))

        useEffect(() => {
            setRefresh(false)
            if (user === "admin") loadAllEnquiries()
            else loadAllEnquiriesByMember()
        }, [user, refresh])

    function handleDelete(id) {
        toast.promise(deleteEnquiry(id), {
            pending: 'Removing...',
            success: 'Enquiry removed successfully!!'
        }, TOAST_PROP)
            .then(res => {
                setEnquiries(enquiries.filter(enquiry => enquiry.id !== id))
                // loadAllEnquiries()
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data ? err.response.data : "Failed to remove the enquiry", TOAST_PROP);
            })
    }

    return (
        <Container className='p-2'>
            {
                (user !== "admin")
                    ? (
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h2 className='text-center fw-bold text-primary my-2'>ALL ENQUIRIES</h2>
                            <Button variant='info' onClick={toggle}>New Enquiry</Button>
                            <EnquiryModal show={show} toggle={toggle} setRefresh={setRefresh} />
                        </div>
                    )
                    : <h2 className='text-center fw-bold text-primary my-2'>ALL ENQUIRIES</h2>
            }

            <Table responsive className='my-3'>
                <thead>
                    <tr className="text-center text-info">
                        <th>Enquiry ID</th>
                        {
                            (user === "admin") &&
                            <>
                                <th>Member Name</th>
                                <th>Member Email</th>
                            </>
                        }
                        <th>Date</th>
                        <th>Enquiry</th>
                        <th>Reply</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        enquiries.map(enquiry => (
                            <tr key={enquiry.id} className="text-center text-capitalize">
                                <td className='fw-semibold'>{enquiry.id}</td>
                                {
                                    (user === "admin") &&
                                    <>
                                        <td>{enquiry.member.name}</td>
                                        <td className='text-lowercase'>{enquiry.member.email}</td>
                                    </>
                                }
                                <td>{enquiry.date}</td>
                                <td>
                                    <textarea disabled value={enquiry.message} rows="1" className="border-0 text-center" />
                                </td>
                                <td>
                                    <textarea disabled
                                        rows="1"
                                        value={enquiry.reply ? enquiry.reply : "Not Replied"}
                                        className="border-0 text-center"
                                    />
                                </td>
                                <td className={` fw-bold
                                ${enquiry.status === "pending" && "text-warning"}
                                ${enquiry.status === "replied" && "text-success"}
                                `}>
                                    {enquiry.status}
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    {(user === "admin")
                                        ? <div>
                                            <ImReply
                                                color='green'
                                                size={'1.2rem'}
                                                onClick={() => {
                                                    toggle();
                                                    setEnquiryObj(enquiry)
                                                }}
                                            />
                                            <EnquiryModal
                                                show={show}
                                                toggle={toggle}
                                                setRefresh={setRefresh}
                                                enquiryObj={enquiryObj}
                                            />
                                        </div>
                                        : <AiFillDelete
                                            color='red'
                                            size={'1.2rem'}
                                            onClick={() => handleDelete(enquiry?.id)}
                                        />
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

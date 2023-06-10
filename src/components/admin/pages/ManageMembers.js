import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { getAllMembers } from '../../../api/MemberService'
import UserCard from '../../util/UserCard'


export default function ManageMembers() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        getAllMembers().then(res => setMembers(res.data)).catch(err => console.log(err))
    }, [])
    return (
        <Container>
            {(members.length !== 0)
                ? (
                    <>
                        <h1 className='w-100 text-center mt-3 mb-4 text-primary fw-semibold'>ALL MEMBERS</h1>
                        <Row md={2} className="m-0">
                            {members.map(member => (
                                <Col key={member.id} className="">
                                    <UserCard user={member} />
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <div className='d-flex justify-content-center align-items-center'
                        style={{ minHeight: '80vh' }}>
                        <h2 className='fw-bold text-info'>No Members..!</h2>
                    </div>
                )}
        </Container>
    )
}

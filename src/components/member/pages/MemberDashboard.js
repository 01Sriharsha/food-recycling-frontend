import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function MemberDashboard() {

    const { pathname } = useLocation();
    return (
        <div>
            {(pathname === "/member")
                ? (
                    <div className='admin-dashboard'>
                        <div
                            className='position-absolute end-0 m-5 d-flex flex-column align-items-center gap-3 justify-content-center w-25'
                        >
                            <h2 className='text-primary text-center fw-semibold'>Quick Actions</h2>
                            <Button as={Link} to="/member/request-food" className='w-100' variant='secondary'>
                                Request Food
                            </Button>
                            <Button as={Link} to="/member/all-requests" className='w-100' variant='secondary'>
                                View Requested Food
                            </Button>
                            <Button as={Link} to="/member/enquiries" className='w-100' variant='secondary'>
                                My Enqueries
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )
            }
        </div>
    )
}

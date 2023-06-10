import React from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DonationDashboard() {

    const { pathname } = useLocation();

    return (
        <div>
            {(pathname === "/donor")
                ? (
                    <div className='admin-dashboard'>
                        <div
                            className='position-absolute end-0 m-5 d-flex flex-column align-items-center gap-3 justify-content-center w-25'
                        >
                            <h2 className='text-primary text-center fw-semibold'>Quick Actions</h2>
                            <Button as={Link} to="/donate" className='w-100' variant='secondary'>
                                Donate Remaining
                            </Button>
                            <Button as={Link} to="/donor/charity" className='w-100' variant='secondary'>
                                Your Charity Box
                            </Button>
                            <Button as={Link} to="/donor/all-shoutouts" className='w-100' variant='secondary'>
                                View All Shoutouts
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
        </div>
    );
};

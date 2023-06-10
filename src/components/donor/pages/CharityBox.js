import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { getAllDonations } from '../../../api/DonorService';

export default function CharityBox() {
  
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getAllDonations().then(res => {
      setDonations(res.data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <Container className="p-4" fluid>
      <Card className="p-4 rounded shadow-sm">
        <Card.Title className="text-center w-100 fw-bold fs-1 text-primary">Your Charity Box</Card.Title>
        <Card.Body>
          <Table responsive="md" striped>
            <thead>
              <tr className="text-center text-info text-capitalize">
                <th>Donation Id</th>
                <th>Donor Name</th>
                <th>Donor Type</th>
                <th>Food Type</th>
                <th>Food Items</th>
                <th>Total Quantity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                donations.map(donation => (
                  <tr key={donation.id} className="text-center text-capitalize">
                    <td className="fw-semibold">{donation.id}</td>
                    <td>{donation.donorName}</td>
                    <td>{donation.donorType}</td>
                    <td>{donation.foodType}</td>
                    <td className="w-25">{donation.foodItems}</td>
                    <td>{donation.quantity}</td>
                    <td>{donation.date}</td>
                    <td className={`fw-bold 
                    ${donation.approved === "pending" ? 'text-danger' : 'text-success'}`}>
                      {donation.approved}
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

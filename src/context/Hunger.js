import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const HungerProneAreas = () => {
  // Dummy data for demonstration purposes
  const inventoryItems = [
    { id: 1, name: 'Apples', quantity: 100, expirationDate: '2022-04-01' },
    { id: 2, name: 'Bananas', quantity: 50, expirationDate: '2022-03-28' },
    { id: 3, name: 'Carrots', quantity: 75, expirationDate: '2022-03-31' },
    { id: 4, name: 'Bread', quantity: 30, expirationDate: '2022-03-27' },
  ];

  return (
    <Container className="my-5">
      <h2 className="mb-4">Inventory</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.expirationDate}</td>
              <td className="text-center">
                <Button variant="success" size="sm" className="mx-1">Edit</Button>
                <Button variant="danger" size="sm" className="mx-1">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Button variant="primary" size="lg">Add Item</Button>
      </div>
    </Container>
  );
};

export default HungerProneAreas;

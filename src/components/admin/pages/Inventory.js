import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const InventoryPage = () => {
    const [inventoryItems, setInventoryItems] = useState([
        { name: 'Apples', quantity: 10 },
        { name: 'Bananas', quantity: 5 },
        { name: 'Oranges', quantity: 15 },
        { name: 'Tomatoes', quantity: 20 },
    ]);

    const handleDeleteItem = (index) => {
        const newInventoryItems = [...inventoryItems];
        newInventoryItems.splice(index, 1);
        setInventoryItems(newInventoryItems);
    };

    return (
        <Container>
            <h1>Food Recycling Project Inventory</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteItem(index)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default InventoryPage;

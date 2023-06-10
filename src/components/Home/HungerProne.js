import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HungerProneAreas = () => {
  const areas = [
    {
      id: 1,
      name: 'Sub-Saharan Africa',
      description:
        'Sub-Saharan Africa is one of the most hunger-prone regions in the world, with more than 1 in 4 people experiencing chronic food insecurity.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'South Asia',
      description:
        'South Asia is home to more than 500 million people who experience chronic hunger, making it the second most hunger-prone region in the world.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Latin America and the Caribbean',
      description:
        'Despite significant progress in recent years, Latin America and the Caribbean is still home to more than 42 million people who experience chronic hunger.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <Container className='mt-5'>
      <h2 className='text-center'>Hunger-Prone Areas</h2>
      <Row className='mt-5'>
        {areas.map((area) => (
          <Col key={area.id} md={4}>
            <Card className='mb-4'>
              <Card.Img variant='top' src={area.image} />
              <Card.Body>
                <Card.Title>{area.name}</Card.Title>
                <Card.Text>{area.description}</Card.Text>
                <Button variant='primary'>Donate Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HungerProneAreas;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FormContainer } from '../components';

export default function ProductScreen() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const address = 'http://localhost:8080/api/products';

      const { data, status } = await axios.get(address);
      console.log('productData', data);
      if (status === 200) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log('productError', error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col>
            <Card style={{ width: '18rem' }} key={product._id}>
              <Card.Img variant='top' src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.brand}</Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroup.Item>{product.category}</ListGroup.Item>
                <ListGroup.Item>{product.createdAt}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href='#'>Card Link</Card.Link>
                <Card.Link href='#'>Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

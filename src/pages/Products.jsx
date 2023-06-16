import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import '../styles/Custom.css';
import ProductModal from '../components/ProductModal';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  const selectedCategory = location.state?.category;

  useEffect(() => {
    getProducts();
  }, []);

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

  const onClickCard = (product) => {
    console.log('selectedProduct', selectedProduct);
    setSelectedProduct(product);
    setModalShow(true);
  };

  // const filteredProducts =
  console.log('selectedCategory', selectedCategory);

  return (
    <div style={{ backgroundColor: '#F5F5F7' }}>
      <Container className='pt-5'>
        <Row>
          {products.map((product) => (
            <Col className='mt-4'>
              <Card
                onClick={() => onClickCard(product)}
                className='custom-card'
                key={product._id}
              >
                <Card.Img
                  variant='top'
                  src={product.image}
                  style={{
                    maxHeight: '420px',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroup.Item>{product.category}</ListGroup.Item>
                  <ListGroup.Item>{product.createdAt}</ListGroup.Item>
                  <ListGroup.Item style={{ height: '100px' }}>
                    {product.description}
                  </ListGroup.Item>
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
      <ProductModal
        product={selectedProduct}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

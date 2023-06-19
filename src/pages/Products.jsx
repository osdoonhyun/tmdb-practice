import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Row,
  Spinner,
} from 'react-bootstrap';
import '../styles/Custom.css';
import ProductModal from '../components/ProductModal';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from '../actions/productActions';

export default function Products() {
  const dispatch = useDispatch();
  const { category } = useParams();
  // const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  const selectedCategory = location.state?.category;

  const getProducts = useSelector((state) => state.getProducts);
  const { loading, error, products } = getProducts;

  useEffect(() => {
    dispatch(getProductsAction(category));
  }, [category, dispatch]);

  const onClickCard = (product) => {
    console.log('selectedProduct', selectedProduct);
    setSelectedProduct(product);
    setModalShow(true);
  };

  // const filteredProducts =
  console.log('selectedCategory', selectedCategory);

  return (
    <div style={{ backgroundColor: '#F5F5F7' }}>
      {loading && <Spinner animation='border' />}
      {error && <Alert variant='danger'>{error}</Alert>}
      <Container className='pt-5'>
        <Row>
          {products &&
            products.map((product) => (
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

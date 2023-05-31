import { Col, Container, Row } from 'react-bootstrap';

export default function FormContainer({ title, children }) {
  return (
    <Container>
      <h1 className='mt-5'>{title}</h1>
      <Row className='mt-4'>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}

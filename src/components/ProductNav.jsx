import { Nav } from 'react-bootstrap';

export default function ProductNav({ categories }) {
  return (
    <>
      <Nav className='me-auto'>
        {categories.map((category) => (
          <Nav.Link href={`/product/${category}`}>{category}</Nav.Link>
        ))}
      </Nav>
    </>
  );
}

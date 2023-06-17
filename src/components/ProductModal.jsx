import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ProductModal(props) {
  // const { onHide, product } = props;
  console.log('모달', props);
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.product?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.product?.category}</h4>
        <img
          style={{ width: '500px', height: '100%', objectFit: 'cover' }}
          src={props.product?.image}
          alt={props.product?.name}
        />
        <p>{props.product?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

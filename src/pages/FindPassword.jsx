import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormContainer } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FindPassword() {
  const [email, setEmail] = useState('');

  const findIdHandler = (e) => {
    e.preventDefault();

    console.log('아이디찾기');
  };
  return (
    <FormContainer>
      <h1 className='mb-4'>비밀번호 찾기</h1>
      <Form onSubmit={findIdHandler} className='mb-3'>
        <Form.Text className='d-flex justify-content-center'>
          비밀번호를 찾고자하는 아이디를 입력해주세요.
        </Form.Text>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Row className='mb-2'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Control
                value={email}
                placeholder='이메일'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form.Group>
        <div className='d-grid gap-1'>
          <Button type='submit'>다음</Button>
        </div>
      </Form>
      <Form.Text className='d-flex justify-content-center'>
        아이디가 기억나지 않는다면?
        <Link style={{ marginLeft: '10px' }} to={'/findid'}>
          아이디 찾기
        </Link>
      </Form.Text>
    </FormContainer>
  );
}

import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setEmail(userInfo.email);
    setPassword(userInfo.password);
    setUserName(userInfo.name);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return (
    <FormContainer title={`${userInfo.name}님 반갑습니다.`}>
      {loading && <Spinner />}
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Row className='mb-2'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>
          </Row>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />

          <Form.Text className='text-muted'>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Form.Text>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            placeholder='비밀번호'
          />
        </Form.Group>

        <Form.Group
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='mb-3'
          controlId='formBasicPassword'
        >
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            placeholder='닉네임'
          />
          <br />
        </Form.Group>
        <Row>
          <Col>
            <div className='d-flex justify-content-center'>
              <Button variant='primary' type='submit' className='w-100 mt-3'>
                수정하기
              </Button>
            </div>
          </Col>
          <Col>
            <div className='d-flex justify-content-center'>
              <Button variant='danger' type='submit' className='w-100 mt-3'>
                탈퇴하기
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

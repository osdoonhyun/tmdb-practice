import { useState } from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SingUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailCategory, setEmailCategory] = useState('');

  const [password, setPassword] = useState('');

  const signUpHandler = async (e) => {
    e.preventDefault(); // 클릭시 로딩이 무한 반복됨
    const userInput = {
      email: email + emailCategory,
      password,

      // confirmPassword는 백한테 보내줄 필요없음
    };

    try {
      console.log('userInput', userInput);
      const { data, status } = await axios.post(
        'http://localhost:8080/api/users/login',
        userInput
      );
      console.log('+++++++++', data);
      console.log('---------', status);
      if (status === 200) {
        alert('Successful LogIn');
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (error) {
      console.log('loginError', error.message);
    }
  };

  const emailList = [
    '@naver.com',
    '@hanmail.net',
    '@daum.net',
    '@gmail.com',
    '@naver.com',
    '@hotmail.com',
  ];

  return (
    <FormContainer title='LogIn'>
      <Form onSubmit={signUpHandler}>
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

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />

          <Form.Text className='text-muted'>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </Form.Text>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='비밀번호'
          />
        </Form.Group>

        <div className='d-flex justify-content-center mt-4'>
          <Button variant='primary' type='submit' className='w-100'>
            로그인
          </Button>
        </div>
      </Form>
      <div className='d-flex justify-content-center mt-3'>
        <Nav as='ul'>
          <Nav.Item as='li'>
            <Nav.Link href='/reset-password'>비밀번호 재설정</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/signup'>회원가입</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </FormContainer>
  );
}

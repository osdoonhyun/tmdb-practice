import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Nav, Row, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailCategory, setEmailCategory] = useState('');

  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const loginHandler = (e) => {
    // action
    e.preventDefault();

    dispatch(loginUser(email + emailCategory, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]); // navigate 상태를 봐준다.

  // const loginHandler = async (e) => {
  //   e.preventDefault(); // 클릭시 로딩이 무한 반복됨
  //   const userInput = {
  //     email: email + emailCategory,
  //     password,

  //     // confirmPassword는 백한테 보내줄 필요없음
  //   };

  //   try {
  //     console.log('userInput', userInput);
  //     const { data, status } = await axios.post(
  //       'http://localhost:8080/api/users/login',
  //       userInput
  //     );
  //     console.log('+++++++++', data);
  //     console.log('---------', status);
  //     if (status === 200) {
  //       alert('Successful LogIn');
  //       localStorage.setItem('token', data.token);
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.log('loginError', error.message);
  //   }
  // };

  return (
    <FormContainer title='LogIn'>
      {loading && <Spinner animation='border' />}
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={loginHandler}>
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
            <Nav.Link href='/signup'>회원가입</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/findid'>아이디 찾기</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/findpassword'>비밀번호 찾기</Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link href='/reset-password'>비밀번호 재설정</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </FormContainer>
  );
}

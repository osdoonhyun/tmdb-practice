import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

export default function SingUp() {
  const [email, setEmail] = useState('');
  const [emailCategory, setEmailCategory] = useState('');

  const [passWord, setPassWord] = useState('');

  console.log('email', email + emailCategory);
  const signUpHandler = async (e) => {
    e.preventDefault(); // 클릭시 로딩이 무한 반복됨
    const userInput = {
      email: email + emailCategory,
      passWord,

      // confirmPassword는 백한테 보내줄 필요없음
    };
    console.log(userInput);
    // try {
    // } catch (error) {}
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Select
                defaultValue='Choose...'
                value={emailCategory}
                onChange={(e) => setEmailCategory(e.target.value)}
              >
                <option>선택해주세요</option>
                {emailList.map((email, index) => (
                  <option key={index}>{email}</option>
                ))}
              </Form.Select>
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
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            type='password'
            placeholder='비밀번호'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
}

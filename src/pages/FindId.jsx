import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormContainer } from '../components';
import { useEffect, useState } from 'react';

export default function FindId() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificated, setIsVerificated] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [isEmailVerificated, setIsEmailVerificated] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const findIdHandler = (e) => {
    e.preventDefault();

    console.log('아이디찾기');
  };

  const onClickEmailVerificationBtn = (e) => {
    e.preventDefault();
    setIsEmailVerificated(true);
  };

  useEffect(() => {
    if (name !== '' && email !== '') {
      setBtnDisabled(false);
    }
  }, [name, email]);

  return (
    <FormContainer>
      <h1>아이디 찾기</h1>
      <Form onSubmit={findIdHandler}>
        <Form.Group as={Col} controlId='formGridCity'>
          <Form.Label className='text-muted'>이름</Form.Label>
          <Form.Control
            value={name}
            placeholder='이름'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridCity'>
          <Row className='mt-2'>
            <Form.Label className='text-muted'>이메일</Form.Label>

            {/* 이메일 형식에 맞지 않으면 경고문으로 보여줘도 괜찮을듯 */}
            <Form.Text className='text-muted'>
              이메일 형식에 맞게 작성해주세요.
            </Form.Text>
          </Row>
          <Form.Control
            value={email}
            placeholder='이메일'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* 이메일 인증 */}
        <div className='d-flex justify-content-center'>
          <Button
            className='mt-3 w-100'
            onClick={() => setIsVerificated(true)}
            disabled={btnDisabled}
          >
            이메일로 인증코드 보내기
          </Button>
        </div>

        {isVerificated && (
          <Form.Group className='mt-3' controlId='formBasicPassword'>
            <Form.Text className='text-muted'>
              이메일로 전송된 인증코드를 입력해주세요.
            </Form.Text>
            <Form.Control
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              type='password'
              placeholder='인증코드 6자리 입력'
            />
            <Button
              className='mt-3 w-100'
              variant='primary'
              onClick={onClickEmailVerificationBtn}
              type='submit'
            >
              확인
            </Button>
          </Form.Group>
        )}

        {/* 새로운 비밀번호 */}
        {isEmailVerificated && (
          <>
            <Form.Group className='mt-3' controlId='newPassword'>
              <Form.Label>새 비밀번호</Form.Label>
              <Form.Control type='email' placeholder='새 비밀번호' />
            </Form.Group>
            <Form.Group className='mt-3' controlId='newPassword'>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type='email' placeholder='비밀번호 확인' />
            </Form.Group>
            <Button className='mt-3 w-100' variant='primary' type='submit'>
              비밀번호 변경
            </Button>
          </>
        )}
      </Form>
    </FormContainer>
  );
}

// 이메일 형식이 잘못되었습니다.

// 인증번호를 발송했습니다.
// 인증번호가 오지 않으면 입력하신 정보가 회원정보와 일치하는지 확인해 주세요.

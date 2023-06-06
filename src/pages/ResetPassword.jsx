import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isVerification, setIsVerification] = useState(false);

  const [bntDisable, setBtnDisable] = useState(false);

  console.log(verificationCode);

  useEffect(() => {
    if (email !== '') {
      setBtnDisable(true);
    }
  }, [email]);

  const ResetPasswordHandler = () => {
    console.log('reset');
  };

  return (
    <FormContainer>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      <Form onSubmit={ResetPasswordHandler}>
        <Form.Label>가입한 이메일 주소를 입력해주세요.</Form.Label>
        <Row className='mb-2'>
          <Form.Group as={Col} controlId='formGridCity'>
            <Form.Text className='text-muted'>
              이메일 형식에 맞게 작성해주세요.
            </Form.Text>
            <Form.Control
              value={email}
              placeholder='이메일'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button
              className='mt-3 w-100'
              onClick={() => setIsVerification(true)}
              disabled={bntDisable ? false : true}
            >
              이메일로 인증코드 보내기
            </Button>
          </div>
          {/* {isVerification && (
            <Form.Group className='mt-3'>
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
                className='mt-3'
                variant='primary'
                onClick={verificationCodeHandler}
              >
                확인
              </Button>
            </Form.Group>
          )} */}
        </Row>
      </Form>
    </FormContainer>
  );
}

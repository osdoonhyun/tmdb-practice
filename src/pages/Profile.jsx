import axios from 'axios';
import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { Card, Image, ListGroup } from 'react-bootstrap';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + token.toString(),
        },
      };
      console.log('config', config);
      const { data, status } = await axios.get(
        'http://localhost:8080/api/users/profile',
        config
      ); // header 값이 있을 경우엔 넣어주어야 한다.
      console.log('++++++++++', data);
      console.log('----------', status);
      if (status === 200) {
        setUserInfo(data);
      }
    } catch (error) {
      console.log('profileError', error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <FormContainer title='Profile'>
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant='top' src='holder.js/100px180?text=Image cap' /> */}
        <Image
          src='https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg'
          roundedCircle
        />
        <Card.Body>
          {/* <Card.Title>유저 정보</Card.Title> */}
          <Card.Text>{userInfo.name}</Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroup.Item>{userInfo.email}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href='#'>Card Link</Card.Link>
          <Card.Link href='#'>Another Link</Card.Link>
        </Card.Body>
      </Card>
    </FormContainer>
  );
}

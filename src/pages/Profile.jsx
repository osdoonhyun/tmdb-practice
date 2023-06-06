import axios from 'axios';
import { useEffect, useState } from 'react';

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
    <>
      <h1>{userInfo.name}</h1>
    </>
  );
}

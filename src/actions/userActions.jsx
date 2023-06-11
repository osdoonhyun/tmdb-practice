import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';

const mainAddress = 'http://localhost:8080/api';
// 로그인 처리 actions  //dispatch 가 리덕스에서 사용되는 비동기처리 메서드
const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data, status } = await axios.post(`${mainAddress}/users/login`, {
      email,
      password,
    });

    if (status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data, // 데이터가 들어감
      });
    }
    localStorage.setItem('token', data.token); // 이렇게 하면 프로필 정보 가져올 때
    localStorage.setItem('userInfo', data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  dispatch({
    type: USER_LOGOUT,
  });
};

export { loginUser, logoutUser };

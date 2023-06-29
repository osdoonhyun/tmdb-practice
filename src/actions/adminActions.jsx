import axios from 'axios';
import {
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
} from '../constants/adminConstants';

const mainAddress = 'http://localhost:8080/api';
const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const adminGetUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_USERS_REQUEST,
    });

    const { data, status } = await axios.get(mainAddress + '/users', config);
    console.log('&&&&&&&&&&', status, data);
    if (status === 200) {
      dispatch({
        type: ADMIN_GET_USERS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const adminUpdateUser = (users, updatedUser, id) => async (dispatch) => {
  const address = mainAddress + `/users/${id}`;
  try {
    dispatch({
      type: ADMIN_UPDATE_USER_REQUEST,
    });

    const { data, status } = await axios.put(address, updatedUser, config);

    if (status === 200) {
      dispatch({
        type: ADMIN_UPDATE_USER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const adminDeleteUser = (id) => async (dispatch) => {
  const address = mainAddress + `/users/${id}`;
  try {
    dispatch({
      type: ADMIN_DELETE_USER_REQUEST,
      payload: false,
    });
    const { status } = await axios.delete(address, config);

    if (status === 200) {
      dispatch({
        type: ADMIN_DELETE_USER_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { adminGetUsers, adminUpdateUser, adminDeleteUser };

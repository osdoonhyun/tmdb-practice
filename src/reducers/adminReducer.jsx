import {
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
} from '../constants/adminConstants';

const adminGetUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return { loading: true };
    case ADMIN_GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const adminUpdateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return { loading: true, result: action.payload }; // payload: false
    case ADMIN_DELETE_USER_SUCCESS:
      return { loading: false, result: action.payload }; // payload: true
    case ADMIN_DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { adminGetUsersReducer, adminUpdateUserReducer, adminDeleteUserReducer };

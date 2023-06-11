import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer } from './reducers/userReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') // 또는 'token'
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // 상태에 따라서 display 보기 위해
);

export default store;

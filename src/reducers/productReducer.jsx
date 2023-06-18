import {
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
} from '../constants/productContants';

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return { loading: true };
    case PRODUCT_GET_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { productReducer };

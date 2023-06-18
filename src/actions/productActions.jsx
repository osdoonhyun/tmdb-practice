import axios from 'axios';
import {
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
} from '../constants/productContants';

const productAddress = 'http://localhost:8080/api';

const getProductsAction = (category) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_GET_REQUEST,
    });

    const { data, status } = await axios.get(`${productAddress}/products`);

    let filteredData = [];
    if (status === 200) {
      if (category !== 'All') {
        console.log('클릭 카테고리', category);
        console.log('데이터 들어오나', data.products);
        filteredData = data.products.filter(
          (product) => category.toLowerCase() === product.category
        );
      } else {
        filteredData = data.products;
      }
      console.log('productAction%%^^%^%^%^%', filteredData);
      dispatch({
        type: PRODUCT_GET_SUCCESS,
        payload: filteredData,
      });
    }

    // localStorage.setItem('data', data.products);
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getProductsAction };

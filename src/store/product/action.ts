import { Dispatch } from "redux";
import ProductApi from "apis/product";
import Product from "types/product";
import {
  PENDING,
  GET_PRODUCTS,
  REJECTED,
  ActionTypes,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_DETAIL
} from "./constant";

export const getProducts = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const response = await ProductApi.getAll();
    dispatch({ type: GET_PRODUCTS, payload: response.data });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};

export const deleteProduct =
  (id: number) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await ProductApi.remove(id);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export const addProduct =
  (item: Product) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ProductApi.add(item);
      dispatch({ type: ADD_PRODUCT, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const getProductDetail =
  (id: number) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ProductApi.get(id);
      dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
export const updateProduct =
  (id: number, item: Product) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const response = await ProductApi.edit(id, item);
      dispatch({ type: UPDATE_PRODUCT, payload: response.data });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

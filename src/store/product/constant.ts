import Product from "types/product";

export const PENDING = "PENDING";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const REJECTED = "REJECTED";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_PRODUCTS; payload: Product[] }
  | { type: typeof DELETE_PRODUCT; payload: number }
  | { type: typeof ADD_PRODUCT; payload: Product }
  | { type: typeof GET_PRODUCT_DETAIL; payload: Product }
  | { type: typeof UPDATE_PRODUCT; payload: Product }
  | { type: typeof REJECTED };

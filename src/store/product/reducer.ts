import Product from "types/product";
import {
  PENDING,
  GET_PRODUCTS,
  ADD_PRODUCT,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  REJECTED,
  ActionTypes
} from "./constant";

interface InitialStateType {
  products: Product[];
  productDetail: Product;
  loading: boolean;
}

const initialState: InitialStateType = {
  products: [],
  productDetail: {
    id: 0,
    name: "",
    price: 0,
    import_price: 0,
    tax: 0,
    status: true,
    image: "",
    description: "",
    categoryID: 0,
    author: "",
    publishing_year: "",
    date_submitted: "",
    timeCreat_Update: ""
  },
  loading: false
};

const productsReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case PENDING:
      return {
        ...state,
        loading: true
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case DELETE_PRODUCT: {
      const filterProducts = state.products.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, products: filterProducts, loading: false };
    }
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
        loading: false
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        productDetail: action.payload,
        loading: false
      };
    case REJECTED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default productsReducer;

import Category from "types/category";

const PENDING = "PENDING";
const GET_CATEGORIES = "GET_CATEGORIES";
const REJECTED = "REJECTED";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const CREATE_CATEGORY = "CREATE_CATEGORY";
const EDIT_CATEGORY = "EDIT_CATEGORY";

export {
  PENDING,
  GET_CATEGORIES,
  REJECTED,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  EDIT_CATEGORY
};

interface Pending {
  type: typeof PENDING;
  payload?: string;
}
interface IGetCategoryAction {
  type: typeof GET_CATEGORIES;
  payload: Category[];
}
interface Rejected {
  type: typeof REJECTED;
  payload?: string;
}
interface IDeleteCategoryAction {
  type: typeof DELETE_CATEGORY;
  payload: number;
}
interface ICreateCategoryAction {
  type: typeof CREATE_CATEGORY;
  payload: Category;
}

interface IEditCategoryAction {
  type: typeof EDIT_CATEGORY;
  payload: Category;
}

export type ActionTypes =
  | Pending
  | Rejected
  | IGetCategoryAction
  | IDeleteCategoryAction
  | ICreateCategoryAction
  | IEditCategoryAction;

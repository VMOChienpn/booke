import CategoryAPI from "apis/category";
import { Dispatch } from "redux";
import Category from "types/category";
import {
  ActionTypes,
  GET_CATEGORIES,
  PENDING,
  REJECTED,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  EDIT_CATEGORY
} from "./constant";

const getCategories = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PENDING });
  try {
    const { data: categories } = await CategoryAPI.getAll();
    dispatch({ type: GET_CATEGORIES, payload: categories });
  } catch (error) {
    dispatch({ type: REJECTED });
  }
};
const deleteCategory =
  (id: number) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      await CategoryAPI.remove(id);
      dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
const createCategories =
  (item: Category) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: category } = await CategoryAPI.add(item);
      dispatch({ type: CREATE_CATEGORY, payload: category });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };
const editCategories =
  (item: Category) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: PENDING });
    try {
      const { data: category } = await CategoryAPI.edit(item.id, item);
      dispatch({ type: EDIT_CATEGORY, payload: category });
    } catch (error) {
      dispatch({ type: REJECTED });
    }
  };

export { getCategories, deleteCategory, createCategories, editCategories };

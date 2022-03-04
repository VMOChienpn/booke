import User, { IUserLogin } from "types/user";

export const PENDING = "PENDING";
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const UPDATE_USER = "UPDATE_USER";
export const REJECTED = "REJECTED";
export const LOGIN_USER = "LOGIN_USER";
export const RESET_ERROR = "RESET_ERROR";

export type ActionTypes =
  | { type: typeof PENDING }
  | { type: typeof GET_USERS; payload: User[] }
  | { type: typeof DELETE_USER; payload: number }
  | { type: typeof ADD_USER; payload: User }
  | { type: typeof GET_USER_DETAIL; payload: User }
  | { type: typeof UPDATE_USER; payload: User }
  | { type: typeof REJECTED; payload?: string }
  | { type: typeof LOGIN_USER; payload: IUserLogin }
  | { type: typeof RESET_ERROR };

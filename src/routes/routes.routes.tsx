import { ComponentType } from "react";

import { Dashboard, Categories, Product, User } from "pages";
import Create from "pages/product/create";
import Edit from "pages/product/edit";
import {
  PATH_CATEGORIES,
  PATH_PRODUCTS,
  PATH_PRODUCTS_ADD,
  PATH_PRODUCTS_UPDATE,
  PATH_USER
} from "./routes.paths";

interface RouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}

export const appRoutes: RouteModel[] = [
  {
    exact: true,
    path: "/",
    component: Dashboard
  },
  {
    exact: true,
    path: PATH_CATEGORIES,
    component: Categories
  },
  {
    exact: true,
    path: PATH_PRODUCTS,
    component: Product
  },
  {
    exact: true,
    path: PATH_PRODUCTS_ADD,
    component: Create
  },
  {
    exact: true,
    path: PATH_PRODUCTS_UPDATE,
    component: Edit
  },
  {
    exact: true,
    path: PATH_USER,
    component: User
  }
];

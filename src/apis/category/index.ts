import { axiosClient } from "apis";

import Category from "types/category";

const CategoryAPI = {
  getAll() {
    const url: string = `/categories`;
    return axiosClient.get(url);
  },
  add(category: Category) {
    const url: string = `/categories`;
    return axiosClient.post(url, category);
  },
  edit(id: number, category: Category) {
    const url: string = `/categories/${id}`;
    return axiosClient.put(url, category);
  },
  remove(id: number) {
    const url: string = `/categories/${id}`;
    return axiosClient.delete(url);
  }
};
export default CategoryAPI;

import { axiosClient } from "apis";

import Product from "types/product";

const ProductApi = {
  getAll() {
    const url: string = `/products`;
    return axiosClient.get(url);
  },
  get(id: number) {
    const url: string = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(product: Product) {
    const url: string = `/products/`;
    return axiosClient.post(url, product);
  },
  edit(id: number, product: Product) {
    const url: string = `/products/${id}`;
    return axiosClient.put(url, product);
  },
  remove(id: number) {
    const url: string = `/products/${id}`;
    return axiosClient.delete(url);
  }
};
export default ProductApi;

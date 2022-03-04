import { axiosClient } from "apis";

import User, { IUserLogin } from "types/user";

const UserApi = {
  getAll() {
    const url: string = `/users`;
    return axiosClient.get(url);
  },
  get(id: number) {
    const url: string = `/users/${id}`;
    return axiosClient.get(url);
  },
  add(user: User) {
    const url: string = `/users`;
    return axiosClient.post(url, user);
  },
  update(id: number, user: User) {
    const url: string = `/users/${id}`;
    return axiosClient.put(url, user);
  },
  remove(id: number) {
    const url: string = `/users/${id}`;
    return axiosClient.delete(url);
  },
  login(user: IUserLogin) {
    const url: string = `/login`;
    return axiosClient.post(url, user);
  }
};
export default UserApi;

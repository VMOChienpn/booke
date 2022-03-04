import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import Button from "components/button";
import Input from "components/input";
import User from "types/user";

import { addUser, getUsers, updateUser } from "store/users/action";
import { userSchema } from "./user-form.schema";
import styles from "./form.module.css";

interface FormProps {
  mode: string;
  userRow: User;
  isOpen: boolean;
  onClose: () => void;
  onCurrentPage: Function;
}

export default function Form({
  mode,
  userRow,
  isOpen,
  onClose,
  onCurrentPage
}: FormProps) {
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  let title: string;
  if (mode === "edit") {
    title = "Edit User";
  } else {
    title = "Add User";
  }
  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        id: userRow.id,
        name: userRow.name,
        email: userRow.email,
        password: userRow.password,
        phone: userRow.phone,
        address: userRow.address,
        timeCreat_Update: userRow.timeCreat_Update
      };
    }
    return {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      timeCreat_Update: ""
    };
  }, [userRow, mode]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (values: User, { resetForm }: any): void => {
    if (mode === "edit") {
      const valueEdit = {
        ...values,
        timeCreat_Update: moment().format()
      };
      dispatch(updateUser(userRow.id, valueEdit));
      dispatch(getUsers());
    } else {
      dispatch(addUser({ ...values, timeCreat_Update: moment().format() }));
      dispatch(getUsers());
    }
    dispatch(getUsers());
    resetForm({ values: "" });
    onCurrentPage(1);
    onClose();
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: userSchema
  });

  return (
    <div>
      {isOpen ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-center fixed bg-gray-800 bg-opacity-50 inset-0 z-50">
            <div className="flex flex-col p-5 h-auto max-w-xl rounded-md bg-white shadow-lg w-full">
              <div className="flex justify-between mb-6">
                <h1 className="font-semibold text-xl">{title}</h1>
                <Button className="border-none text-xl ml-36" onClick={onClose}>
                  <AiFillCloseCircle />
                </Button>
              </div>
              <div className="my-3 flex items-center">
                <div className="flex mr-2 w-24">
                  <label
                    className="mr-1 block text-gray-700 text-md font-bold"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <Input
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <span className={styles.error}>{formik.errors.name}</span>
              ) : null}
              <div className="my-3 flex items-center">
                <div className="flex mr-2 w-24">
                  <label
                    className="mr-1 block text-gray-700 text-md font-bold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span className={styles.error}>{formik.errors.email}</span>
              ) : null}
              <>
                <div className="my-3 flex items-center">
                  <div className="flex mr-2 w-24">
                    <label
                      className="mr-1 block text-gray-700 text-md font-bold"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <p className="text-red-500">*</p>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex justify-end mr-1 ">
                  <i
                    className="hover:text-blue-400 cursor-pointer"
                    onClick={togglePasswordVisiblity}
                  >
                    Show password
                  </i>
                </div>
              </>

              {formik.touched.password && formik.errors.password ? (
                <span className={styles.error}>{formik.errors.password}</span>
              ) : null}
              <div className="my-3 flex items-center">
                <div className="flex mr-2 w-24">
                  <label
                    className="mr-1 block text-gray-700 text-md font-bold"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <Input
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <span className={styles.error}>{formik.errors.phone}</span>
              ) : null}
              <div className="my-3 flex items-center">
                <div className="flex mr-2 w-24">
                  <label
                    className="mr-1 block text-gray-700 text-md font-bold"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <Input
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.address && formik.errors.address ? (
                <span className={styles.error}>{formik.errors.address}</span>
              ) : null}

              <div className="flex justify-end items-center mt-2">
                <Button
                  className="w-20 text-gray-900 font-medium rounded-lg p-2 hover:bg-gray-200 hover:bg-opacity-30"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="w-20 text-blue-400 font-medium rounded-lg p-2 hover:bg-gray-200 hover:bg-opacity-30"
                  type="submit"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}

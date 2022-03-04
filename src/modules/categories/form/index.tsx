import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";

import { createCategories, editCategories } from "store/categories/action";
import Button from "components/button";
import Input from "components/input";
import Switch from "components/switch";
import Category from "types/category";
import styles from "./form.module.css";
import { categorySchema } from "./form-category.schema";

interface FormProps {
  mode: string;
  categoryRow: Category;
  isOpen: boolean;
  onClose: () => void;
  onCurrentPage: Function;
}

export default function Form({
  mode,
  categoryRow,
  isOpen,
  onClose,
  onCurrentPage
}: FormProps) {
  const [valueSwitch, setValueSwitch] = useState<boolean>(true);
  const { categories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  let title: string;
  if (mode === "edit") {
    title = "Edit Category";
  } else {
    title = "Add Category";
  }
  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        id: categoryRow.id,
        name: categoryRow.name,
        description: categoryRow.description,
        status: categoryRow.status,
        timeCreat_Update: categoryRow.timeCreat_Update
      };
    }
    return {
      id: 0,
      name: "",
      description: "",
      status: true,
      timeCreat_Update: ""
    };
  }, [categoryRow, mode]);

  const handleSwitch = (isCheck: boolean): void => {
    setValueSwitch(isCheck);
  };

  const index: number[] = Object.values(categories).map(
    (value: any) => value.id
  );
  const handleSubmit = (values: Category, { resetForm }: any): void => {
    const submitData = {
      id: index[index.length] + 1,
      name: values.name,
      description: values.description,
      status: valueSwitch,
      timeCreat_Update: moment().format()
    };
    if (mode === "create") {
      dispatch(createCategories(submitData));
    } else {
      dispatch(editCategories({ ...submitData, id: categoryRow.id }));
    }
    setValueSwitch(true);
    resetForm({ values: "" });
    onCurrentPage(1);
    onClose();
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: categorySchema
  });

  return (
    <div>
      {isOpen ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-center fixed bg-gray-800 bg-opacity-50 inset-0 z-[999]">
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
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <Input
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.description && formik.errors.description ? (
                <span className={styles.error}>
                  {formik.errors.description}
                </span>
              ) : null}
              <div className="my-3 flex items-center">
                <label
                  className="mr-2 w-24 block text-gray-700 text-md font-bold"
                  htmlFor="description"
                >
                  Status
                </label>
                <Switch
                  onChange={handleSwitch}
                  isChecked={formik.values.status}
                />
              </div>
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

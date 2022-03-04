import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useMemo, useState, useEffect } from "react";
import { RootState } from "store";
import { useParams, Link, useHistory } from "react-router-dom";
import moment from "moment";

import Button from "components/button";
import Input from "components/input";
import Select from "components/select";
import Switch from "components/switch";
import Category from "types/category";
import {
  addProduct,
  getProductDetail,
  getProducts,
  updateProduct
} from "store/product/action";
import { getCategories } from "store/categories/action";
import { PATH_PRODUCTS } from "routes/routes.paths";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./form.module.css";
import { productSchema } from "./product-form.schema";

interface UserFormProps {
  mode: "create" | "edit";
}

export default function Form({ mode }: UserFormProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState("");
  const [statusSwitch, setStatusSwitch] = useState<boolean>(true);
  const { productDetail } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(Number(id)));
    }
    dispatch(getCategories());
  }, [id]);
  const handleSwitch = (value: boolean): void => {
    setStatusSwitch(value);
  };
  const getLinkImage = (e: ChangeEvent<HTMLInputElement>): void => {
    setImage(e.target.value);
  };

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        name: productDetail.name,
        price: productDetail.price,
        import_price: productDetail.import_price,
        tax: productDetail.tax,
        status: productDetail.status,
        image: productDetail.image,
        description: productDetail.description,
        categoryID: productDetail.categoryID,
        author: productDetail.author,
        publishing_year: productDetail.publishing_year,
        date_submitted: productDetail.date_submitted,
        timeCreat_Update: productDetail.timeCreat_Update
      };
    }
    return {
      name: "",
      price: "",
      import_price: "",
      tax: "",
      status: true,
      image: "",
      description: "",
      categoryID: "",
      author: "",
      publishing_year: "",
      date_submitted: "",
      timeCreat_Update: ""
    };
  }, [productDetail, mode]);

  function handleSubmit(values: any) {
    console.log(values);
    if (mode === "edit") {
      const valueEdit = {
        ...values,
        status: statusSwitch,
        timeCreat_Update: moment().format()
      };
      dispatch(updateProduct(Number(id), valueEdit));
      dispatch(getProducts());
    } else {
      dispatch(addProduct({ ...values, timeCreat_Update: moment().format() }));
      dispatch(getProducts());
    }
    dispatch(getProducts());
    setLoading(true);
    setTimeout(() => {
      history.push(PATH_PRODUCTS);
    }, 1000);
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: handleSubmit
  });

  return (
    <div>
      <Link to={PATH_PRODUCTS}>
        <Button className="rounded-full px-3 py-3 bg-blue-400 text-white text-xl hover:bg-blue-500 transition-all">
          <AiOutlineArrowLeft />
        </Button>
      </Link>
      <div className="text-center text-2xl font-bold pb-3 shadow-sm ">
        PRODUCT INFORMATION
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="p-5 flex justify-center bg-white rounded-md shadow-lg"
      >
        <div className="w-1/2">
          <div className="flex justify-between">
            <div className="mt-1 w-2/4 mr-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="name"
              >
                Name
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline bg-[#EEEEEE] focus:bg-white"
                name="name"
                id="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <span className={styles.error}>{formik.errors.name}</span>
              ) : null}
            </div>
            <div className="mt-1 w-2/4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="author"
              >
                Author
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="author"
                id="author"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.author}
              />
              {formik.touched.author && formik.errors.author ? (
                <span className={styles.error}>{formik.errors.author}</span>
              ) : null}
            </div>
          </div>
          <div className="flex">
            <div className="mt-1 w-2/4 mr-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Price
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="price"
                id="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                min="0"
              />
              {formik.touched.price && formik.errors.price ? (
                <span className={styles.error}>{formik.errors.price}</span>
              ) : null}
            </div>
            <div className="mt-1 w-2/4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="import_price"
              >
                Import price
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="import_price"
                id="import_price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.import_price}
                min="0"
              />
              {formik.touched.import_price && formik.errors.import_price ? (
                <span className={styles.error}>
                  {formik.errors.import_price}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex">
            <div className="mt-1 w-2/4 mr-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="tax"
              >
                Tax
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="tax"
                id="tax"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.tax}
                min="0"
              />
              {formik.touched.tax && formik.errors.tax ? (
                <span className={styles.error}>{formik.errors.tax}</span>
              ) : null}
            </div>
            <div className="mt-1 w-2/4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="image"
              >
                Image
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="image"
                id="image"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.image}
                onBlur={getLinkImage}
              />
              {formik.touched.image && formik.errors.image ? (
                <span className={styles.error}>{formik.errors.image}</span>
              ) : null}
            </div>
          </div>

          <div className="mt-1">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="description"
            >
              Description
              <span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white h-40"
              name="description"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <span className={styles.error}>{formik.errors.description}</span>
            ) : null}
          </div>

          <div className="flex">
            <div className="mt-1 w-2/4 mr-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="publishing_year"
              >
                Publishing Year
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="publishing_year"
                id="publishing_year"
                type="number"
                min="0"
                onChange={formik.handleChange}
                value={formik.values.publishing_year}
              />
              {formik.touched.publishing_year &&
              formik.errors.publishing_year ? (
                <span className={styles.error}>
                  {formik.errors.publishing_year}
                </span>
              ) : null}
            </div>
            <div className="mt-1 w-2/4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="date_submitted"
              >
                Date Submitted
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Input
                className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline focus:border-blue-400 bg-[#EEEEEE] focus:bg-white"
                name="date_submitted"
                id="date_submitted"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date_submitted}
              />
              {formik.touched.date_submitted && formik.errors.date_submitted ? (
                <span className={styles.error}>
                  {formik.errors.date_submitted}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex">
            <div className="mt-1 w-2/4 mr-4">
              <p className="block text-gray-700 text-md font-bold mb-2">
                Status
              </p>
              <Switch
                onChange={handleSwitch}
                isChecked={formik.values.status}
              />
            </div>
            <div className="mt-1 w-2/4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="categoryID"
              >
                Category
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Select
                className="h-[2.6rem] py-[11px] px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:border-blue-400 "
                name="categoryID"
                id="categoryID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryID}
              >
                {categories.map((value: Category) => (
                  <option
                    key={value.id}
                    className="leading-10"
                    value={value.id}
                  >
                    {value.name}
                  </option>
                ))}
              </Select>
              {formik.touched.categoryID && formik.errors.categoryID ? (
                <span className={styles.error}>{formik.errors.categoryID}</span>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button
              loading={loading}
              className="flex items-center mr-4 px-3 py-2 rounded-md transition-all bg-blue-400 hover:bg-blue-500 text-white text-sm"
              type="submit"
            >
              SUBMIT
            </Button>
            <Link to={PATH_PRODUCTS} className="">
              <Button className="px-3 py-2 rounded-md transition-all bg-[#EEEEEE] hover:bg-gray-400">
                CANCEL
              </Button>
            </Link>
          </div>
        </div>
        {id ? (
          <div className="ml-10 mt-5 block">
            {!image ? (
              <img
                className="w-[20rem] h-[30rem] border-md shadow-lg rounded-xl"
                src={Object(productDetail).image}
                alt=""
              />
            ) : (
              <img
                className="w-[20rem] h-[30rem] border-md shadow-lg rounded-xl"
                src={image}
                alt=""
              />
            )}
          </div>
        ) : (
          <div className="ml-10 mt-5 block">
            {image ? (
              <img
                className="w-[20rem] h-[30rem] border-md shadow-lg rounded-xl"
                src={image}
                alt=""
              />
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}

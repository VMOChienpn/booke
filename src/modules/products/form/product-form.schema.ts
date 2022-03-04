import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  price: Yup.string().required("Please enter price"),
  import_price: Yup.string().required("Please enter import price"),
  tax: Yup.string().required("Please enter tax"),
  image: Yup.string().required("Please enter image"),
  description: Yup.string().required("Please enter description"),
  categoryID: Yup.string().required("Please choose category"),
  publishing_year: Yup.string().required("Please choose publishing year"),
  date_submitted: Yup.string().required("Please choose date submitted"),
  author: Yup.string().required("Please enter author")
});

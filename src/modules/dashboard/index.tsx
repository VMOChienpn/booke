import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { FaShoppingBasket, FaThLarge, FaUsers } from "react-icons/fa";

import DashboardCard from "components/dashboard-card";
import CircleChart from "components/chart";
import { getProducts } from "store/product/action";
import { getCategories } from "store/categories/action";
import { getUsers } from "store/users/action";
import Product from "types/product";
import Category from "types/category";

export default function DashboardList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUsers());
  }, []);

  const filterProducts = products.filter((item: Product) =>
    item.status ? item : ""
  );

  const filterCategories = categories.filter((item: Category) =>
    item.status ? item : ""
  );

  const dataProduct = [
    { name: "In stock", value: Number(filterProducts.length) },
    {
      name: "Out of stock",
      value: Number(products.length) - Number(filterProducts.length)
    }
  ];

  const dataCategory = [
    { name: "Active", value: Number(filterCategories.length) },
    {
      name: "Inactive",
      value: Number(categories.length) - Number(filterCategories.length)
    }
  ];

  return (
    <div>
      <h2 className="mb-10 text-3xl font-medium text-gray-600">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-around mb-8 bg-white text-gray-600 shadow-md rounded-xl ">
          <div className="flex justify-center items-center ml-3">
            <DashboardCard
              icon={<FaShoppingBasket />}
              count={Number(products?.length)}
              title="Total Products"
            />
          </div>
          <div className="flex justify-center items-center">
            <CircleChart data={dataProduct} />
          </div>
        </div>
        <div className="flex items-center justify-around mb-8 bg-white text-gray-600 shadow-md rounded-xl  ">
          <div className="flex justify-center items-center ml-3">
            <DashboardCard
              icon={<FaThLarge />}
              count={Number(categories?.length)}
              title="Total Categories"
            />
          </div>
          <div className="flex justify-center items-center">
            <CircleChart data={dataCategory} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center justify-around mb-8 p-7 bg-white text-gray-600 shadow-md rounded-xl">
          <DashboardCard
            icon={<FaUsers />}
            count={Number(Object.values(users)?.length)}
            title="Total Users"
          />
        </div>
      </div>
    </div>
  );
}

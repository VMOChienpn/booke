import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "store/product/action";
import { getCategories } from "store/categories/action";
import { RootState } from "store";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

import Button from "components/button";
import Popup from "components/popup";
import Product from "types/product";
import Category from "types/category";
import Table from "components/table";
import ProductsTableHead from "./products.table-head";

interface ProductListProps {
  select: string;
  search: string;
  pageSize: number;
  currentPage: number;
  onCurrentPage: Function;
  onPageSize: Function;
}

const ProductList = ({
  select,
  search,
  pageSize,
  currentPage,
  onCurrentPage,
  onPageSize
}: ProductListProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [productId, setProductId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { products } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.categories);

  const selectProductCategory = products.filter((product: Product) => {
    if (select === "") {
      return product;
    }
    if (select !== "") {
      return product.categoryID === Number(select);
    }
    return false;
  });

  const sortProducts = selectProductCategory.sort(
    (a, b) =>
      new Date(b.timeCreat_Update).getTime() -
      new Date(a.timeCreat_Update).getTime()
  );

  const newArrayProducts = sortProducts.filter((product: Product) => {
    if (
      product.name
        .trim()
        .toLocaleLowerCase()
        .match(search.trim().toLocaleLowerCase())
    ) {
      return product;
    }
    return false;
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleClickOpen = (id: number) => {
    setIsOpen(true);
    setProductId(id);
  };
  const handleClickClose = () => setIsOpen(false);

  const handleClickDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
    setIsOpen(false);
    onCurrentPage(1);
  };

  const renderRows = (product: Product, index: number) => (
    <tr key={product.id} className="text-left">
      <td className="py-5">{(currentPage - 1) * pageSize + (index + 1)}</td>
      <td className="py-5 pl-5 w-1/5 max-w-[10rem] xl:max-w-[20rem] ">
        <p className="truncate w-10/12">{product.name}</p>
      </td>
      <td className="py-5 w-2/12">{formatPrice(product.import_price)}</td>
      <td className="py-5 pl-5 w-1/12">{formatPrice(product.price)}</td>
      <td className="py-5 pl-5 w-1/5 max-w-[10rem] xl:max-w-[20rem] ">
        {categories.map((category: Category) => {
          if (category.id === Number(product.categoryID)) {
            return <p className="truncate w-10/12">{category.name}</p>;
          }
          return null;
        })}
      </td>
      <td className="py-5 w-1/12">
        {product.status ? (
          <p className="p-1 text-center border border-[#019707] rounded bg-[#019707] text-xs text-white">
            In stock
          </p>
        ) : (
          <p className="p-1 text-center border border-[#fb0b12] rounded bg-[#fb0b12] text-xs text-white">
            Out of stock
          </p>
        )}
      </td>
      <td className="py-5 pl-5 w-2/12">
        <Button
          className="hover:text-yellow-800 bg-white text-yellow-600 text-xl pl-2 pr-7"
          onClick={() => history.push(`products/update/${product.id}`)}
        >
          <BsPencilSquare />
        </Button>
        <Button
          onClick={() => handleClickOpen(product.id)}
          className="hover:text-red-800  bg-white text-red-600 text-xl"
        >
          <BsTrash />
        </Button>
      </td>
    </tr>
  );

  return (
    <div className="mt-10">
      <Table
        head={<ProductsTableHead />}
        data={newArrayProducts}
        renderRows={renderRows}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageSize={onPageSize}
        onCurrentPage={onCurrentPage}
      />

      <Popup
        isOpen={isOpen}
        title="Confirm Infomation"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteProduct(productId)}
      />
    </div>
  );
};
export default ProductList;

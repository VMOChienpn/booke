import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "components/button";
import Search from "components/search";
import Select from "components/select";
import { Link } from "react-router-dom";
import { PATH_PRODUCTS_ADD } from "routes/routes.paths";
import Category from "types/category";
import List from "./list";

export default function ProductList() {
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    setCurrentPage(1);
  };

  const { categories } = useSelector((state: RootState) => state.categories);

  const handleSearch = (searchName: string) => {
    setSearch(searchName);
  };

  return (
    <div>
      <div className="flex items-center bg-white p-8 shadow-md rounded-lg justify-between m">
        <p className="font-bold text-xl">Product</p>
        <div className="w-3/4 flex justify-end">
          <div className="w-1/4 mr-10">
            <Select value={select} onChange={handleChangeSelect}>
              <option value="">All</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          <Search onSearch={handleSearch} onCurrentPage={setCurrentPage} />
          <Link to={PATH_PRODUCTS_ADD}>
            <Button
              loading={false}
              className="flex p-3 bg-blue-400 hover:bg-blue-500 text-white"
            >
              <AiOutlinePlus className="pr-2 text-2xl font-bold" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <List
        select={select}
        search={search}
        pageSize={pageSize}
        currentPage={currentPage}
        onCurrentPage={setCurrentPage}
        onPageSize={setPageSize}
      />
    </div>
  );
}

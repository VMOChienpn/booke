import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

import Button from "components/button";
import Search from "components/search";
import User from "types/user";
import UsersList from "./list";
import Form from "./form";

export default function UserList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keySearch, setKeySearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [mode, setMode] = useState<string>("create");
  const [userRow, setUserRow] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    timeCreat_Update: ""
  });

  const handleSearch = (search: string) => {
    setKeySearch(search);
  };

  const hanldeClickAddButon = (): void => {
    setIsOpen(true);
    setMode("create");
  };
  const handleClose = (): void => {
    setIsOpen(false);
  };
  const hanldeClickEditButon = (value: User): void => {
    setUserRow(value);
    setIsOpen(true);
    setMode("edit");
  };

  return (
    <div>
      <div className="flex items-center bg-white p-8 shadow-md rounded-lg justify-between">
        <p className="font-bold text-xl">User</p>
        <div className="w-3/4 flex justify-end">
          <Search onSearch={handleSearch} onCurrentPage={setCurrentPage} />
          <Button
            loading={false}
            onClick={hanldeClickAddButon}
            className="flex p-3 bg-blue-400 hover:bg-blue-500 text-white"
          >
            <AiOutlinePlus className="pr-2 text-2xl font-bold" />
            Add User
          </Button>
          <Form
            isOpen={isOpen}
            mode={mode}
            userRow={userRow}
            onClose={handleClose}
            onCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="mt-10">
        <UsersList
          keySearch={keySearch}
          pageSize={pageSize}
          currentPage={currentPage}
          onCurrentPage={setCurrentPage}
          onPageSize={setPageSize}
          hanldeClickEditButon={hanldeClickEditButon}
        />
      </div>
    </div>
  );
}

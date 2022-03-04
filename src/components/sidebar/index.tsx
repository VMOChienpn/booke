import {
  AiFillAppstore,
  AiOutlineMenuUnfold,
  AiFillHdd,
  AiOutlineUsergroupAdd
} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

import logo from "assets/logo.png";
import { PATH_CATEGORIES, PATH_PRODUCTS, PATH_USER } from "routes/routes.paths";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-80 p-5 bottom-0 bg-white shadow-xl z-50">
      <div className="my-10 text-4xl text-center">
        <Link to="/" className="flex justify-center">
          <img className="w-40" src={logo} alt="" />
        </Link>
      </div>
      <nav className="pt-7 text-center">
        <NavLink
          exact
          activeClassName="bg-blue-400 text-white transition-all"
          to="/"
          className="flex py-4 cursor-pointer text-md text-left mx-2 rounded-2xl hover:text-white transition-all mb-1 relative"
        >
          <div className={styles.button}> </div>
          <AiFillAppstore className="text-2xl mx-3" /> Dashboard
        </NavLink>
        <NavLink
          exact
          activeClassName="bg-blue-400 text-white transition-all"
          to={PATH_CATEGORIES}
          className="flex py-4 cursor-pointer text-md text-left mx-2 rounded-2xl hover:text-white transition-all mb-1 relative"
        >
          <div className={styles.button}> </div>
          <AiOutlineMenuUnfold className="text-2xl mx-3" />
          Category Management
        </NavLink>
        <NavLink
          activeClassName="bg-blue-400 text-white transition-all"
          to={PATH_PRODUCTS}
          className="flex py-4 cursor-pointer text-md text-left mx-2 rounded-2xl hover:text-white transition-all mb-1 relative"
        >
          <div className={styles.button}> </div>
          <AiFillHdd className="text-2xl mx-3" />
          Product Management
        </NavLink>
        <NavLink
          activeClassName="bg-blue-400 text-white transition-all"
          to={PATH_USER}
          className="flex py-4 cursor-pointer text-md text-left mx-2 rounded-2xl hover:text-white transition-all mb-1 relative"
        >
          <div className={styles.button}> </div>
          <AiOutlineUsergroupAdd className="text-2xl mx-3" />
          User Management
        </NavLink>
      </nav>
    </div>
  );
}

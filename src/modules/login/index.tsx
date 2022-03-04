import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

import logo from "assets/logo.png";
import { IUserLogin } from "types/user";
import { loginUser, resetError } from "store/users/action";
import Button from "components/button";
import Input from "components/input";

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.users);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: IUserLogin = {
    email: "",
    password: ""
  };

  const isCheck = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (isCheck) {
      history.replace("/");
    }
  }, [isCheck]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [error]);

  const handleLoadingBtn = () => {
    setIsLoading(false);
    dispatch(resetError());
  };

  const handleSubmit = (values: IUserLogin) => {
    const submitData: IUserLogin = {
      email: values.email,
      password: values.password
    };
    setIsLoading(true);
    dispatch(loginUser(submitData));
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });

  return (
    <div>
      <div className="bg-gray-100 h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex rounded-lg shadow-lg w-1/4 bg-white sm:mx-0">
            <div className="flex flex-col w-full p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <div className="flex justify-center py-5">
                  <img className="w-40" src={logo} alt="" />
                </div>
                <h1 className="text-4xl text-center font-thin">
                  Sign in to Booke Admin
                </h1>
                <div className="w-full mt-4">
                  <p className="text-center text-red-600 py-3">{error}</p>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="form-horizontal ml-16 mx-auto"
                  >
                    <div className="flex flex-col mt-4">
                      <Input
                        id="email"
                        type="text"
                        name="email"
                        required
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onFocus={handleLoadingBtn}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onFocus={handleLoadingBtn}
                      />
                    </div>
                    <div className="flex items-center mt-4">
                      <Input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="mr-2"
                      />{" "}
                      <label
                        htmlFor="remember"
                        className="text-sm text-grey-dark"
                      >
                        Remember Me
                      </label>
                    </div>
                    <div className="flex flex-col mt-8 w-4/5">
                      <Button
                        loading={isLoading}
                        type="submit"
                        className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded flex justify-center"
                      >
                        Sign in
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

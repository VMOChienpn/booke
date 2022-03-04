import React, { ComponentPropsWithoutRef } from "react";
import { CgSpinner } from "react-icons/cg";

import styles from "./button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button = ({ loading, children, ...props }: ButtonProps) => (
  <button type="button" className={styles.button} {...props}>
    {loading ? (
      <>
        <CgSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
        {children}
      </>
    ) : (
      children
    )}
  </button>
);

Button.defaultProps = {
  loading: false
};

export default Button;

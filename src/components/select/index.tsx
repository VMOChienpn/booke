import React, { ComponentPropsWithoutRef } from "react";

import styles from "./select.module.css";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  children: React.ReactNode;
}

const Select = ({ children, ...props }: SelectProps) => (
  <div className={styles.select}>
    <select {...props}>{children}</select>
  </div>
);
export default Select;

import { ComponentPropsWithoutRef } from "react";

import styles from "./spinner.module.css";

interface SpinnerProps extends ComponentPropsWithoutRef<"div"> {}

const Spinner = ({ ...props }: SpinnerProps) => (
  <div className={styles.loader} {...props}>
    {""}
  </div>
);

export default Spinner;

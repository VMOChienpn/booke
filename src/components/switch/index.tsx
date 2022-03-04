import { ChangeEvent, useState, useEffect } from "react";

import styles from "./switch.module.css";

interface SwitchProps {
  onChange: (value: boolean) => void;
  isChecked: boolean;
}

export default function Switch({ onChange, isChecked }: SwitchProps) {
  const [value, setValue] = useState<boolean>(true);

  useEffect(() => {
    setValue(isChecked);
  }, [isChecked]);

  const onChangeSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValue(checked);
    onChange(checked);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChangeSwitch} checked={value} />
      <span className={styles.slider} />
    </label>
  );
}

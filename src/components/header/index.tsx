import { useState } from "react";
import { useHistory } from "react-router";

import Popup from "components/popup";
import avatar from "assets/avt.jpg";
import styles from "./header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory();

  const hanldeClickLogout = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const hanldeLogout = (): void => {
    localStorage.removeItem(`accessToken`);
    history.push("/login");
  };

  return (
    <div className="fixed top-0 right-0 flex left-80 bg-white z-50 justify-end h-24 items-center content shadow-sm">
      <div className="flex items-center">
        <div className={styles.button}>
          <img src={avatar} alt="" />
          <div className={styles.logout} onClick={hanldeClickLogout}>
            LOG OUT
          </div>
          <div className="text-black ">
            <Popup
              isOpen={isOpen}
              title="Confirm Action"
              message="Logout or Not?"
              onClose={handleClickClose}
              onConfirm={hanldeLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

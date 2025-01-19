import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AccountMenu({ onLogout }) {
  const { name, imageUrl } = useSelector((state) => state.auth.profile);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogoutAccount = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

  const getFirstCharacterOfName = (fullname) => {
    if (!name || typeof name !== "string") {
      return "";
    }
    const nameParts = fullname.trim().split(" ");
    const lastName = nameParts[nameParts.length - 1];
    return lastName.charAt(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={menuRef} className="relative ml-2">
        <Tooltip title="Tài khoản">
          <IconButton onClick={handleToggleMenu} size="small">
            <Avatar sx={{ width: 32, height: 32 }} src={imageUrl}>
              {getFirstCharacterOfName(name)}
            </Avatar>
          </IconButton>
        </Tooltip>
        <div
          className={`${
            openMenu
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-5 opacity-0 invisible"
          } transition-all absolute top-full right-0 w-[200px] shadow bg-white`}
        >
          <ul className="py-2">
            <li className="hover:bg-primary hover:text-white transition-all">
              <Link
                to="/profile"
                onClick={handleToggleMenu}
                className="px-4 py-1 inline-block w-full"
              >
                Thông tin cá nhân
              </Link>
            </li>
            <li className="hover:bg-primary hover:text-white transition-all">
              <Link
                to="/orders"
                onClick={handleToggleMenu}
                className="px-4 py-1 inline-block w-full"
              >
                Đơn hàng của bạn
              </Link>
            </li>
            <li className="hover:bg-primary hover:text-white transition-all">
              <Link
                to="#"
                onClick={handleLogoutAccount}
                className="px-4 py-1 inline-block w-full"
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

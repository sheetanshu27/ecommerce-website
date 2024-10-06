import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Safely get user and cart from the state, with cart defaulting to an empty array
  let {user, cart}= useSelector((state)=>({...state}));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Section */}
        <div style={{ display: "flex" }}>
          <Item key="home" icon={<AppstoreOutlined />}>
            <Link to="/">Home</Link>
          </Item>

          <Item key="shop" icon={<ShoppingOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>

          <Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">
              <Badge count={cart.length} offset={[9, 0]}>
                Cart
              </Badge>
            </Link>
          </Item>
        </div>

        {/* Right Section */}
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <div className="d-flex align-items-center">
            <Search />
          </div>

          {!user && (
            <Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Item>
          )}

          {!user && (
            <Item key="login" icon={<UserOutlined />}>
              <Link to="/login">Login</Link>
            </Item>
          )}

          {user && (
            <SubMenu
              icon={<SettingOutlined />}
              title={user.email && user.email.split("@")[0]}
            >
              {user && user.role === "subscriber" && (
                <Item>
                  <Link to="/user/history">Dashboard</Link>
                </Item>
              )}

              {user && user.role === "admin" && (
                <Item>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Item>
              )}

              <Item icon={<LogoutOutlined />} onClick={logout}>
                LogOut
              </Item>
            </SubMenu>
          )}
        </div>
      </div>
    </Menu>
  );
};

export default Header;

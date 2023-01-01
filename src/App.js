import React from "react";

import {
  AppstoreOutlined,
  MailOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

//import "./App.css";
import "antd/dist/antd.min.css";

import About from "./pages/About/About";
import Users from "./pages/Users";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            <Link to={"/"}>Inicio</Link>
          </Menu.Item>
          <Menu.Item key="about" icon={<MailOutlined />}>
            <Link to={"/about"}>Acerca de</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<MailOutlined />}>
            <Link to={"/Users"}>REGA</Link>
          </Menu.Item>
          <Menu.Item key="blog" icon={<PlusOutlined />}>
            <Link to={"/blog/esto"}>Blog</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="SubMenu"
            title="Navigation Two - Submenu"
            icon={<SettingOutlined />}
          >
            <Menu.Item key="two" icon={<AppstoreOutlined />}>
              <Link to={"/"}>Interno</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blog/:slug" element={<Blog />}></Route>
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

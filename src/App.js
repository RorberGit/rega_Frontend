import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import Cookies from "universal-cookie";

import Layout from "./components/Layout";
import About from "./pages/About/About";
import Home from "./pages/Home/index";
import RegRega from "./pages/RegRega";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Menu from "./pages/Menu/Menu";
import PageNotFound from "./pages/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import Head from "./components/head";
// eslint-disable-next-line import/no-unresolved
import { useAuthContext } from "./contexts/auth-context";

function App() {
  const { user } = useAuthContext();

  const cookies = new Cookies();

  useEffect(() => {
    const cargandoCookies = () => {
      if (cookies.get("id")) {
        console.log("cookies:", cookies.get("usuario"));
      }
    };

    cargandoCookies();
  });

  return (
    <>
      {user && <Head />}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<RegRega />} />
            <Route path="/home" element={<Home />} />
          </Route>
          
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/RegRega" element={<RegRega />} />
          <Route path="/blog/:slug" element={<Blog />}></Route>
          <Route element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

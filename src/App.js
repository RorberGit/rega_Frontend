import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import Cookies from "universal-cookie";

import Layout from "./components/Layout";
import DashBoard from "./pages/DashBoard";
import RegRega from "./pages/RegRega";
import Usuarios from "./pages/Usuarios";
import Units from "./pages/Units";
import ProcDest from "./pages/ProcDest";

import Home from "./pages/Home/index";

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import Head from "./components/head";
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
            <Route path="/" element={<DashBoard />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/rega" element={<RegRega />} />
          </Route>
          
          <Route path="/users" element={<Usuarios />} />
          <Route path="/units" element={<Units />} />
          <Route path="/procdest" element={<ProcDest />} />

          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

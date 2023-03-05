import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { getUser } from "../services";
import Cookies from "universal-cookie";

import * as AXIOSCONST from "../constants/axios.constants";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const getusuario = async () => {
      const result = await getUser(cookies.get("id"));
      setUser(result.data);
    }

    if (!user && cookies.get("id")){      
      console.log("preba exito");
      getusuario();
    }
  });

  //poner Cookies
  const setCurrentUser = (currentUser) =>{

    setUser(currentUser);

    cookies.set("id", currentUser.Co_usuario, {
      path: "/",
      maxAge: 86400,
    });
    cookies.set("usuario", currentUser.datosgenerales, {
      path: "/",
      maxAge: 86400,
    });    
  }

  //Funcion para verificar el usurio y la contraseña
  const Login = async (isUser, isPassword) => {
    return await axios({
      method: "post",
      url: AXIOSCONST.LOGIN,
      data: {
        usuario: isUser,
        password: isPassword,
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, Login, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

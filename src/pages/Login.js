import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MenuItem, Typography, Grid, Paper, Button, Box } from "@mui/material";

import { Formik, Field, Form } from "formik";

import { Select, TextField } from "formik-mui";

import getUnidades from "../hooks/getUnidades";
import getUsuarios from "../hooks/getUsuarios";

import { useAuthContext } from "../contexts/auth-context";

export default function Login() {
  const { Login, setCurrentUser } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");

  const [unidades, setUnidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isUnidad, setIsUnidad] = useState(true);
  const [isUsuario, setIsUsuario] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const cargarUnidades = async () => {
      const result = await getUnidades();
      setUnidades(result);
    };

    cargarUnidades();
  }, []);

  const handleUnit = async (e) => {
    const result = await getUsuarios(e.target.value);
    setUsuarios(result);
    setIsUnidad(false);
  };

  const handleUser = async () => {
    setIsUsuario(false);
  };

  return (
    <Formik
      initialValues={{
        unidad: "",
        usuario: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.unidad) {
          errors.unidad = "La Unidad es requerida";
        }

        if (!values.usuario) {
          errors.usuario = "El Usuario es requerido";
        }

        if (!values.password) {
          errors.password = "La contraseña es requerida";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        setSubmitting(false);
        setErrorMsg("");

        const obtenerLogin = async () => {
          try {
            const resp = await Login(values.usuario, values.password);

            console.log("resulta", resp);

            //Si el usuario y la contraseñas son correctas
            if (resp.statusCode === 200) {
              delete resp.data.passnreg;
              setCurrentUser(resp.data);

              //Navegar al rega
              // window.location.href=ROUTES.REGA;
              //navigate(RUTAS.REGA);
              //window.location.reload();
              navigate(from, { replace: true });
            }

            //Si la ruta esta mal escrita
            if (resp.statusCode === 404) setErrorMsg("Ruta no encontrada");

            //si la contraseña es incorrecta
            if (resp.statusCode === 406)
              setFieldError("password", resp.message);
          } catch (error) {
            if (!error.response) {
              setErrorMsg("Servidor no encontrado");
            }
          }
        };

        obtenerLogin();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
              minHeight: "100vh",
              minWidth: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              display: "flex",
            }}
          >
            <Box sx={{ width: "400px" }}>
              <Paper elevation={12} sx={{ padding: 5 }}>
                <Grid item sx={{ marginBottom: 2, textAlign: "center" }}>
                  <Typography variant="body1" color="red">
                    {errorMsg}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Inicio de Sesión
                  </Typography>
                </Grid>
                <Grid item sx={{ marginBottom: 2 }}>
                  <Field
                    component={Select}
                    id="unidad"
                    name="unidad"
                    label="Unidad"
                    onChange={handleUnit}
                    sx={{ minWidth: "320px", maxWidth: "320px" }}
                  >
                    {unidades.map((elemento) => (
                      <MenuItem value={elemento.Num_unidad_reg}>
                        {elemento.descripcionureg}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item sx={{ marginBottom: 2 }}>
                  <Field
                    component={Select}
                    id="usuario"
                    name="usuario"
                    label="Usuario"
                    disabled={isUnidad}
                    onChange={handleUser}
                    sx={{ minWidth: "320px", maxWidth: "320px" }}
                  >
                    {usuarios &&
                      usuarios.map((elemento) => (
                        <MenuItem value={elemento.Co_usuario}>
                          {elemento.datosgenerales}
                        </MenuItem>
                      ))}
                  </Field>
                </Grid>
                <Grid item sx={{ marginBottom: 2 }}>
                  <Field
                    component={TextField}
                    id="password"
                    name="password"
                    label="Contraseña"
                    disabled={isUsuario}
                    sx={{ minWidth: "320px" }}
                    type="password"
                  />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Aceptar
                  </Button>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

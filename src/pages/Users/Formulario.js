import React, { useEffect, useState } from "react";

import style from "./style";

import { Box, Modal, MenuItem, Grid, Button, Typography } from "@mui/material";

import { Formik, Form, Field } from "formik";

import { TextField, Select } from "formik-mui";

import axios from "axios";

import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const Formulario = ({ open, onClose, postedit, currentrow }) => {
  const [users, setUsers] = useState([]);
  const [tipdoc, setTipDoc] = useState([]);
  const [procdest, setProcDest] = useState([]);
  const [tipsop, setTipSop] = useState([]);

  //llamar a inincio del modal
  useEffect(() => {
    if (open === true) {
      GetUserByUnit();
      GetTipDoc();
      GetProcDest();
      GetTipSop();
    }
  }, [open]);

  //Guardar nuevo registro
  const newrecord = async (value) => {
    await api({
      method: "post",
      url: "sistemareg",
      data: value,
    })
      .then(function (response) {
        Swal.fire({
          title: "Registro guardado",
          text: "Acción realizada satisfactoriamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Guardar nuevo registro
  const updaterecord = async (value) => {
    console.log(JSON.stringify(value, null, '\t'));
    await api({
      method: "put",
      url: "/sistemareg/" + currentrow.Co_reg,
      data: value,
    })
      .then(function (response) {
        Swal.fire({
          title: "Registro actualizado",
          text: "Acción realizada satisfactoriamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Poblar select de usuarios
  const GetUserByUnit = async () => {
    await api({
      method: "get",
      url: `/sistema-nombres-reg/unidad/45`,
    })
      .then(function (response) {
        const datos = response.data;

        if (datos.message === "OK") {
          setUsers(datos.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Poblar select de Tipo Documento
  const GetTipDoc = async () => {
    await api({
      method: "get",
      url: `/sistema-tip-doc-cal`,
    })
      .then(function (response) {
        const datos = response.data;

        if (datos.message === "OK") {
          setTipDoc(datos.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Poblar select Procedencia Destino
  const GetProcDest = async () => {
    await api({
      method: "get",
      url: `/sistemaprocdest`,
    })
      .then(function (response) {
        const datos = response.data;

        if (datos.message === "OK") {
          setProcDest(datos.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Poblar select Procedencia Destino
  const GetTipSop = async () => {
    await api({
      method: "get",
      url: `/sistema-tip-sal`,
    })
      .then(function (response) {
        const datos = response.data;

        if (datos.message === "OK") {
          setTipSop(datos.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box>
          <Typography color="darkred" variant="h3" gutterBottom>
            {postedit === "post"
              ? "Insertar Nuevo Registro"
              : "Actualizar Registro"}
          </Typography>
        </Box>
        <Formik
          initialValues={{
            numejemp: 1,
            aclar_adic: postedit === "edit" ? currentrow.aclar_adic : "",
            ent_sal: postedit === "edit" ? currentrow.ent_sal : "",
            Co_tdoc: postedit === "edit" ? currentrow.Co_tdoc.Co_docu : "",
            Co_pdest: postedit === "edit" ? currentrow.Co_pdest.Co_pdest : "",
            Co_tipsal:
              postedit === "edit" ? currentrow.Co_tipsal.Co_tipsal : "",
            Num_unidad_reg: "45",
            Co_nombre:
              postedit === "edit" ? currentrow.Co_nombre.Co_usuario : "",
            denomindoc: postedit === "edit" ? currentrow.denomindoc : "",            
          }}
          validate={(values) => {
            const errors = {};
            if (!values.Co_nombre) {
              errors.Co_nombre = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);

            let date = new Date(Date.now());

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const fusion = {
              fecha: String(year + "-" + month + "-" + day),
              year: String(year),
              repartir: "R",
            };

            const final = Object.assign(values, fusion);

            onClose(true);

            //Funcion que permite guardar el nuevo registro
            if (postedit === "post") newrecord(final);
            if (postedit === "edit") updaterecord(values);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container rowSpacing={3} spacing={2}>
                <Grid item xs={6}>
                  <Field
                    component={Select}
                    id="Co_nombre"
                    name="Co_nombre"
                    labelId="lblusuario"
                    label="Usuario"
                  >
                    {users.map((elemento) => (
                      <MenuItem value={elemento.Co_usuario}>
                        {elemento.datosgenerales}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={Select}
                    id="Num_unidad_reg"
                    name="Num_unidad_reg"
                    labelId="lblUnidad"
                    label="Unidad"
                  >
                    <MenuItem value="45">UBI Ramón de Antilla</MenuItem>
                    <MenuItem value="40">Melilla</MenuItem>
                    <MenuItem value="41">Holguín</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={Select}
                    id="ent_sal"
                    name="ent_sal"
                    labelId="lbles"
                    label="Entrada/Salidad"
                  >
                    <MenuItem value="R/E">Registro de Entrada</MenuItem>
                    <MenuItem value="R/S">Registro de Salidad</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={Select}
                    id="Co_tdoc"
                    name="Co_tdoc"
                    labelId="lbltd"
                    label="Tipo de Documento"
                  >
                    {tipdoc.map((elemento) => (
                      <MenuItem value={elemento.Co_docu}>
                        {elemento.Desc_docu}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={Select}
                    id="Co_pdest"
                    name="Co_pdest"
                    labelId="lblpd"
                    label="Procedencia o Destino"
                  >
                    {procdest.map((elemento) =>
                      elemento.del_sit === "Si" ? (
                        <MenuItem value={elemento.Co_pdest}>
                          {elemento.descripcionpdest}
                        </MenuItem>
                      ) : (
                        ""
                      )
                    )}
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    id="aclar_adic"
                    name="aclar_adic"
                    type="text"
                    label="Aclaraciones adicionales "
                  />
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    id="numejemp"
                    name="numejemp"
                    type="number"
                    label="Número de Ejemplares"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={Select}
                    id="Co_tipsal"
                    name="Co_tipsal"
                    labelId="lblts"
                    label="Tipo de Soporte"
                  >
                    {tipsop.map((elemento) => (
                      <MenuItem value={elemento.Co_tipsal}>
                        {elemento.Desc_tipsal}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    id="denomindoc"
                    name="denomindoc"
                    type="text"
                    label="Descripción"
                  />
                </Grid>

                <Grid
                  item
                  alignItems="center"
                  direction="row"
                  justifyContent="center"
                  xs={12}
                >
                  <div
                    // @ts-ignore
                    class="actionbutton"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Aceptar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        onClose(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default Formulario;

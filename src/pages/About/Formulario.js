import style from "./style";

import { Box, Modal, MenuItem, Grid, Button } from "@mui/material";

import * as React from "react";

import { Formik, Form, Field } from "formik";

import { TextField, Select } from "formik-mui";

import axios from "axios";

import Swal from "sweetalert2";

const Formulario = ({ open, onClose }) => {

  const newrecord = async (value) => {
    await axios
      .post("http://localhost:8000/sistemareg", value)
      .then(function (response) {
        Swal.fire({
          title: "Registro guardado",
          text: "Acción realizada satisfactoriamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        
        onClose(response.data);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Formik
          initialValues={{
            numejemp: 1,
            aclar_adic: "22",
            ent_sal: "R/S",
            Co_tdoc: "CAR",
            Co_pdest: "40",
            Co_tipsal: "01",
            Num_unidad_reg: "45",
            Co_nombre: "78082624901",
            denomindoc: "prueba interfasz",
            fecha: "2022-12-25",
            year: "2022",
            repartir: "R",
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

              //Fincion que permite guardar el nuevo registro
              newrecord(final);
              
              console.log(JSON.stringify(values, null, 2));
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
                    <MenuItem value={78082624901}>Jose</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                    <MenuItem value="CAR">Carta</MenuItem>
                    <MenuItem value="ACT">Actas</MenuItem>
                    <MenuItem value="CIR">Circulares</MenuItem>
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
                    <MenuItem value="40">Vivienda Almest</MenuItem>
                    <MenuItem value="41">UBA Almest</MenuItem>
                    <MenuItem value="42">Holgín Almest</MenuItem>
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
                    <MenuItem value="01">Papel</MenuItem>
                    <MenuItem value="02">Soporte Digital</MenuItem>
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
                      onClick={onClose}
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

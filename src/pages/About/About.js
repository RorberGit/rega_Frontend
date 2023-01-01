// @ts-ignore
import { Button } from "@mui/material";
// @ts-ignore
import { Box } from "@mui/system";
import React, { useState } from "react";
import Formulario from "./Formulario";

const About = () => {
  const [open, setOpen] = useState(false);

  const AbrirCerrar = () => {
    setOpen(!open);    
  };
  
  return (
    <>
      <Box
        sx={{
          textAlign: "right",
          padding: "20px",
        }}
      >
        <Button variant="contained" onClick={AbrirCerrar}>
          Modal
        </Button>
      </Box>
      <Formulario open={open} onClose={AbrirCerrar} />
    </>
  );
};

export default About;

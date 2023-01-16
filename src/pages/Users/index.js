import React, { useCallback, useEffect, useState } from "react";

import MaterialReactTable from "material-react-table";

import { Box, Button, IconButton, Tooltip } from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import axios from "axios";

import { MRT_Localization_ES } from "material-react-table/locales/es";

import columnas from "./columnas";

import Formulario from "./Formulario";

//const url = "http://localhost:8000/sistemareg/unidad/45";

const Users = () => {
  const [cargando, setCargando] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState(true);
  const [postedit, setPostEdit] = useState("post");
  const [currentrow, setCurrentRow] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const CloseModal = async (data) => {
    setEdited(data);
    setOpen(false);
  };

  const poblar = async () => {
    setCargando(true);
    await api.get("/sistemareg/unidad/45").then((response) => {
      const datos = response.data;

      if (datos.message === "OK") {
        setCargando(false);
        setTableData(datos.data);
      }
    });
  };

  useEffect(() => {
    if (!open && edited) poblar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDeleteRow = useCallback(
    (row) => {
      if (window.confirm(`Are you sure you want to delete`)) {
        api({
          method: "delete",
          url: "/sistemareg/" + row.original.Co_reg,
        })
          .then(function (response) {
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    [api, tableData]
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 80,
          },
        }}
        columns={columnas}
        data={tableData}
        enableColumnOrdering
        localization={MRT_Localization_ES}
        enableStickyHeader
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Actualizar">
              <IconButton
                color="success"
                onClick={() => {
                  setPostEdit("edit");
                  setOpen(true);
                  setCurrentRow(row.original);
                  //console.log(JSON.stringify(row.original, null, '\t'));
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Eliminar">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => {
              setPostEdit("post");
              setOpen(true);
            }}
            variant="contained"
          >
            Crear Nuevo Registro
          </Button>
        )}
        state={{
          isLoading: cargando,
          sorting: [{ id: "Co_reg", desc: true }],
        }}
      />
      <Formulario
        open={open}
        onClose={CloseModal}
        postedit={postedit}
        currentrow={currentrow}
      />
    </>
  );
};

export default Users;

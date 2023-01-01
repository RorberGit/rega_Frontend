import React, { useCallback, useEffect, useState } from "react";

import MaterialReactTable from "material-react-table";

import { Box, Button, IconButton, Tooltip } from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import { CreateNewAccountModal } from "./CreateNewAccountModal";

import axios from "axios";

import { MRT_Localization_ES } from "material-react-table/locales/es";

import columnas from "./columnas";

import Formulario from "./Formulario";

const url = "http://localhost:8000/sistemareg/unidad/45";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [open, setOpen] = useState(false);  

  const OpenModal = () => {      
    setOpen(true);     
  };

  const CloseModal = async (data) => {          
    await setOpen(false);     
    alert(data);
    //poblar();
  };

  const poblar = async () => {
    setCargando(true);
    await axios.get(url)
    .then((response) => {
      const datos = response.data;

      if (datos.message === "OK") {
        setCargando(false);
        setTableData(datos.data);
      }
      console.log(datos);
    });
  };

  useEffect(() => {
    poblar();
  }, []);

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    for (const [key, value] of Object.entries(values)) {
      console.log(`${key}: ${value}`);
    }
    console.log(values.Co_nombre + " " + row.index);

    tableData[row.index] = values;

    //send/receive api updates here, then refetch or update local table data for re-render
    setTableData([...tableData]);
    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleDeleteRow = useCallback(
    (row) => {
      console.log(row.getValue("R/S"));
      if (!window.confirm(`Are you sure you want to delete`)) {
        //eslint-disable-line
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
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
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        localization={MRT_Localization_ES}
        enableStickyHeader
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Actualizar">
              <IconButton onClick={() => table.setEditingRow(row)}>
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
            onClick={OpenModal}
            variant="contained"
          >
            Crear Nuevo Registro
          </Button>
        )}
        state={{
          isLoading: cargando,
          sorting: [{ id: "fecha", desc: true }],
        }}
      />        
      <Formulario open={open} onClose={CloseModal}/>

      <CreateNewAccountModal
        columns={columnas}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

export default Users;

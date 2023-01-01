/* eslint-disable no-useless-constructor */
import DataTable from "react-data-table-component";
import { Component } from "react";
import axios from "axios";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const url = "http://localhost:8000/sistemareg/unidad/45";

const handleAddClick = (row) => {
  console.log(`prueba ${row}`);  
};

const handleDelClick = (row) => {
  console.log(`prueba ${row}`);  
};

const columns = [
  {
    name: "...",
    cell: (row) => (
      <>        
        <IconButton
          aria-label="add"
          color="success"
          onClick={handleAddClick.bind(this, row.Co_reg)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="add"
          color="error"
          onClick={handleDelClick.bind(this, row.Co_reg)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
    width: "100px",
    ignoreRowClick: true,
    button: true,
    allowOverflow: true,
  },
  {
    name: "Codigo",
    selector: (row) => row.Co_reg,
    sortable: true,
    width: "100px",
    style: {
      backgroundColor: "green",
      color: "white",
      "&:hover": {
        cursor: "pointer",
        color: "red",
      },
    },
  },
  {
    name: "Nombre",
    selector: (row) => row.Co_nombre.datosgenerales,
    sortable: true,
    width: "400px",
  },
  {
    name: "Denominacion",
    selector: (row) => row.denomindoc,
    sortable: true,
    width: "400px",
  },
  {
    name: "Tipo Documento",
    selector: (row) => row.Co_tdoc.Desc_docu,
    sortable: true,
    width: "200px",
  },
  {
    name: "Numero Rega",
    selector: (row) => row.num_reg,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];
/*
const clickHandler = (state) => {
  message.error("click en editar " + state.target.id);
  console.log(state.target.id);
};
*/
export class Rega extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: [],
      selectedRows: [],
    };
  }

  updateState = (state) => {
    console.log(state.target.id);
    this.setState({ selectedRows: state.selectedRows });
  };

  poblar = () => {
    axios.get(url).then((response) => {
      // handle success
      //console.log(response.data);
      this.setState({ respuesta: response.data.data });
      console.log(response.data.data);
    });

    /*
    fetch(url)
      .then((res) => res.json())
      .then((st) => {
        this.setState({ respuesta: st });
      });
      */
  };

  componentDidMount() {
    this.poblar();
  }

  render() {
    return (
      <div>
        <hr></hr>
        <Button variant="primary">nuevo registro</Button>
        <div>
          <DataTableExtensions
            columns={columns}
            data={this.state.respuesta}
            filterPlaceholder="Filtrar toda la tabla"
            print={false}
            export={false}
          >
            <DataTable
              noHeader
              pagination
              defaultSortField="year"
              defaultSortAsc={false}
              highlightOnHover
            />
          </DataTableExtensions>
        </div>
      </div>
    );
  }
}

export default Rega;

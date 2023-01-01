import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example
const data = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Sara",
    age: 25,
  },
];

export default function Blog() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ cell }) => <strong>{cell.getValue()}</strong>, //optional custom cell render
      },
      {
        accessorFn: (row) => (row.age === 25 ? row.age + row.name : ""), //alternate way
        id: "age", //id required if you use accessorFn instead of accessorKey
        header: "Age",
        Header: <i style={{ color: "red" }}>Age</i>, //optional custom markup
      },
    ],
    []
  );

  return <MaterialReactTable 
          columns={columns} 
          data={data} 
          editingMode="modal" //default
          enableEditing
          />;
}

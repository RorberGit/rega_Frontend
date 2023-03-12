import { useEffect, useState } from "react";
import Users from "../helpers";

function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const result = await Users.getAllUsers();
      setUsers(result);
      console.log(result);

    };

    cargar();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <div>Otas cosas</div>
      {users.map((elemento) => (
        <div>{elemento.datosgenerales}</div>
      ))}
    </div>
  );
}

export default Usuarios;

import React from "react";
import { getUser } from "../../services";

function Home() {
  const oct = async () => {
    const re = await getUser("78082624901");
    console.log("usuario", re.data.datosgenerales);
    return re.data.datosgenerales;
  };
  return (
    <div>
      {oct()}
      <h1>Home</h1>
    </div>
  );
}

export default Home;

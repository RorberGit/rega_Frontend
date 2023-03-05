import axios from "../api/axios";
import * as AXIOSCONST from "../constants/axios.constants";

export default async function getUsuarios(id) {
  const result = await axios({
    method: "get",
    url: AXIOSCONST.USERSBYUNIT + id,
  })
    .then(function (response) {         
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

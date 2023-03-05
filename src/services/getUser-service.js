import axios from "../api/axios";
import * as AXIOSCONST from "../constants/axios.constants";

async function getUser(iduser) {
  try {
    const result = await axios({
      method: "get",
      url: AXIOSCONST.USERS + "/" + iduser,
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });

    return result;
  } catch (errors) {
    if (!errors.response) console.log(errors.response);
  }

  return null;
}

export default getUser;

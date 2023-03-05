import axios from "../api/axios";
import * as AXIOSCONST from "../constants/axios.constants";

export default async function getLogin(user, password) {
  const result = await axios({
    method: "post",
    url: AXIOSCONST.LOGIN,
    data: {
      usuario: user,
      password: password,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {      
      return error.response.data
    });

  return result;
}

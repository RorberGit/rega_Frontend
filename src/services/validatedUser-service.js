import axios from "../api/axios";
import * as AXIOSCONST from "../constants/axios.constants";

async function validatedUser(user, password) {
  try {
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
        return error.response.data;
      });

      return result;
  } catch (errors) {
    if (!errors.response) console.log(errors.response);
  }

  return null;
}

export default validatedUser;

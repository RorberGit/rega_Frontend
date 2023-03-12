import axios from "../api/axios";
import { AXIOSCONST } from "../constants";

const getAllUsers = async () => {
  let result = "";

  try {
    result = await axios({
      method: "get",
      url: AXIOSCONST.USERS,
    })
      .then(function (response) {
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.error(err.response);
  }
  
  return result;
};

function getUsersByUnit() {
  return null;
}

function createUser() {
  return null;
}

function updateUser() {
  return null;
}

function deleteUser() {
  return null;
}

const Users = {
  getAllUsers,
  getUsersByUnit,
  createUser,
  updateUser,
  deleteUser,
};

export default Users;

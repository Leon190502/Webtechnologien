import axios from "axios";
const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  deleteData: deleteData,
  getOne: getOne,
};

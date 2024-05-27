import axios from "axios";
import { IUser } from "../types/types";
import store from "../store";

const API_URL = "http://localhost:8080/users";

const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};

export const fetchUsers = async (): Promise<IUser[]> => {
  const token = getAuthToken();
  const response = await axios.get<IUser[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

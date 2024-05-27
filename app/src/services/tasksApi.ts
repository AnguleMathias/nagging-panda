import axios from "axios";
import { ITask } from "../types/types";
import store from "../store"; // Import the Redux store to access the token

const API_URL = "http://localhost:8080/tasks";

const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};

export const fetchTasks = async (userId: string) => {
  const token = getAuthToken();
  const response = await axios.get<ITask[]>(API_URL, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchAllTasksApi = async () => {
  const token = getAuthToken();
  const response = await axios.get<ITask[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTask = async (task: Partial<ITask>) => {
  const token = getAuthToken();
  const response = await axios.post<ITask>(API_URL, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTask = async (taskId: string, task: Partial<ITask>) => {
  const token = getAuthToken();
  const response = await axios.put<ITask>(`${API_URL}/${taskId}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const token = getAuthToken();
  await axios.delete(`${API_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

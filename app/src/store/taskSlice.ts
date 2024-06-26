import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import * as taskApi from "../services/tasksApi";
import { ITask } from "@/types/types";

interface TaskState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId: string) => {
    const tasks = await taskApi.fetchTasks(userId);
    return tasks;
  }
);

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async () => {
    const response = await taskApi.fetchAllTasksApi();
    return response;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Partial<ITask>) => {
    const newTask = await taskApi.createTask(task);
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }: { id: string; task: Partial<ITask> }) => {
    const updatedTask = await taskApi.updateTask(id, task);
    return updatedTask;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await taskApi.deleteTask(id);
    return id;
  }
);

export const searchAndFilterTasks = createAsyncThunk(
  "tasks/searchAndFilterTasks",
  async ({ userId, filters }: { userId: string; filters: any }) => {
    const response = await taskApi.searchAndFilterTasksApi(userId, filters);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create task";
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete task";
      })
      .addCase(searchAndFilterTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        searchAndFilterTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(searchAndFilterTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export default taskSlice.reducer;

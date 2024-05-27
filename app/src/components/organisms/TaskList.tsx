"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store";
import {
  deleteTask,
  fetchTasks,
  fetchAllTasks,
  createTask,
  updateTask,
} from "@/store/taskSlice";
import { ITask, IUser } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { fetchUsers } from "@/services/userApi";
import Button from "../atoms/Button";
import TaskItem from "../molecules/TaskItem";
import TaskModal from "../molecules/TaskModal";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filterMode, setFilterMode] = useState<"all" | "my">("my");

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully!");
  };

  const handleEdit = (task: ITask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (task: Partial<ITask>) => {
    if (selectedTask) {
      await dispatch(updateTask({ id: selectedTask.id, task }));
      toast.success("Task updated successfully!");
    } else {
      await dispatch(createTask({ ...task, user_id: userId || "" }));
      toast.success("Task created successfully!");
    }
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (filterMode === "my" && userId) {
      dispatch(fetchTasks(userId));
    } else {
      dispatch(fetchAllTasks());
    }
  }, [dispatch, userId, filterMode]);

  const toggleFilterMode = () => {
    setFilterMode((prevMode) => (prevMode === "my" ? "all" : "my"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <Button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </Button>
      </div>
      <div className="flex justify-between mb-4">
        <Button
          onClick={toggleFilterMode}
          className={`${
            filterMode === "my" ? "bg-blue-500" : "bg-gray-500"
          } text-white px-4 py-2 rounded`}
        >
          {filterMode === "my" ? "Show All Tasks" : "Show My Tasks"}
        </Button>
      </div>
      <ul>
        {tasks.map((task: ITask) => (
          <TaskItem
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            users={users}
            canEditOrDelete={task.user_id === userId}
          />
        ))}
      </ul>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        task={selectedTask}
        users={users}
      />
    </div>
  );
};

export default TaskList;

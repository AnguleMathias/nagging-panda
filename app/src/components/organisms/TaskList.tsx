"use client";

import { AppDispatch, RootState } from "@/store";
import {
  deleteTask,
  fetchTasks,
  createTask,
  updateTask,
} from "@/store/taskSlice";
import { ITask, IUser } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../molecules/TaskItem";
import TaskModal from "../molecules/TaskModal";
import Button from "../atoms/Button";
import { fetchUsers } from "@/services/userApi";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: ITask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (task: Partial<ITask>) => {
    if (selectedTask) {
      await dispatch(updateTask({ id: selectedTask.id, ...task }));
    } else {
      await dispatch(createTask({ ...task, user_id: userId }));
    }
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
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
      <ul>
        {tasks.map((task: ITask) => (
          <TaskItem
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            users={users}
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

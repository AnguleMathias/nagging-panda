"use client";

import { ITask, IUser } from "@/types/types";
import React from "react";
import Button from "../atoms/Button";

interface TaskItemProps {
  task: ITask;
  handleDelete: (id: string) => void;
  handleEdit: (task: ITask) => void;
  users: IUser[];
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  handleDelete,
  handleEdit,
  users,
}) => {
  const assignee = users.find((user) => user.id === task.user_id);

  return (
    <div className="border p-4 rounded mb-4 shadow-sm bg-white">
      <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>

      <p className="text-gray-600">{task.description}</p>

      <p className="text-gray-600">
        Created At: {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <p className="text-gray-600">
        Due Date: {new Date(task.due_date).toLocaleDateString()}
      </p>

      <p className="text-gray-600">Priority: {task.priority}</p>

      <p className="text-gray-600">Status: {task.status}</p>

      <p className="text-gray-600">Assignee: {assignee?.username || ""}</p>

      <div className="flex space-x-2 mt-4">
        <Button
          onClick={() => handleEdit(task)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;

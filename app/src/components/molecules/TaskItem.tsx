"use client";

import { ITask, IUser } from "@/types/types";
import React from "react";
import Button from "../atoms/Button";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaHourglassHalf,
  FaLine,
  FaExclamation,
} from "react-icons/fa";

interface TaskItemProps {
  task: ITask;
  handleDelete: (id: string) => void;
  handleEdit: (task: ITask) => void;
  users: IUser[];
  canEditOrDelete: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  handleDelete,
  handleEdit,
  users,
  canEditOrDelete,
}) => {
  const assignee = users.find((user) => user.id === task.user_id);
  const isOverdue = new Date(task.due_date) < new Date();

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <FaExclamationCircle className="text-red-500" />;
      case "Medium":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Low":
        return <FaExclamation className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="border p-4 rounded mb-4 shadow-sm bg-white">
      <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>

      <p className="text-gray-600">{task.description}</p>

      <p className="text-gray-600">
        Created At: {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <p
        className={`text-gray-600 inline-block ${
          isOverdue ? "bg-red-100 rounded p-1" : ""
        }`}
      >
        Due Date: {new Date(task.due_date).toLocaleDateString()}
      </p>

      <p className="text-gray-600 flex items-center gap-1">
        Priority: {task.priority} {getPriorityIcon(task.priority)}
      </p>

      <p className="text-gray-600">Status: {task.status}</p>

      <p className="text-gray-600">Assignee: {assignee?.username || ""}</p>

      {canEditOrDelete && (
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
      )}
    </div>
  );
};

export default TaskItem;

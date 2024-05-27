"use client";

import { ITask } from "@/types/types";
import React from "react";

interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="border p-4 rounded mb-2">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskItem;

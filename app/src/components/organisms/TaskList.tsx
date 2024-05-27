"use client";

import React from "react";
import { useFetch } from "../../hooks/useFetch";
import TaskItem from "../molecules/TaskItem";

const TaskList: React.FC = () => {
  const { data, loading } = useFetch();

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      {data.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

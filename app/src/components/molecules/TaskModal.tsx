"use client";

import React, { useEffect, useState } from "react";
import { ITask, IUser, TaskPriority, TaskStatus } from "@/types/types";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<ITask>) => void;
  task?: ITask | null;
  users: IUser[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  users,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.due_date ? new Date(task.due_date).toISOString().substring(0, 10) : ""
  );
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority || TaskPriority.LOW
  );
  const [status, setStatus] = useState<TaskStatus>(
    task?.status || TaskStatus.PENDING
  );
  const [assignee, setAssignee] = useState(task?.user_id || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(new Date(task.due_date).toISOString().substring(0, 10));
      setPriority(task.priority);
      setStatus(task.status);
      setAssignee(task.user_id);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority(TaskPriority.LOW);
      setStatus(TaskStatus.PENDING);
      setAssignee("");
    }
  }, [task]);

  const handleSubmit = () => {
    onSave({
      title,
      description,
      due_date: new Date(dueDate),
      priority,
      status,
      user_id: assignee,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h2>
        <Input
          id="title"
          label="Title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          id="description"
          label="Description"
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          id="dueDate"
          label="Due Date"
          type="date"
          placeholder="Enter due date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Priority
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value={TaskPriority.LOW}>Low</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.HIGH}>High</option>
        </select>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value={TaskStatus.PENDING}>Pending</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
        </select>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Assignee
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {task ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

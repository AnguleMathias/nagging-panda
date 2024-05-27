"use client";

import React, { useEffect, useState } from "react";
import TaskList from "../organisms/TaskList";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/authSlice";
import { fetchUsers } from "@/services/userApi";
import { IUser } from "@/types/types";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "",
    priority: "",
    dueDate: "",
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const userName = users.find((user) => user.id === userId)?.username;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      title: "",
      description: "",
      assignee: "",
      status: "",
      priority: "",
      dueDate: "",
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Hello, {userName}</span>
          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="mb-4 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="title"
            label="Title"
            type="text"
            value={filters.title}
            onChange={handleFilterChange}
            placeholder="Search by title"
            name="title"
          />
          <Input
            id="description"
            label="Description"
            type="text"
            value={filters.description}
            onChange={handleFilterChange}
            placeholder="Search by description"
            name="description"
          />

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Assignee
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={filters.assignee}
              onChange={handleFilterChange}
              name="assignee"
            >
              <option value="">All</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <Input
            id="dueDate"
            label="Due Date"
            type="date"
            value={filters.dueDate}
            onChange={handleFilterChange}
            placeholder="Search by due date"
            name="dueDate"
          />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Priority
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={filters.priority}
              onChange={handleFilterChange}
              name="priority"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={filters.status}
              onChange={handleFilterChange}
              name="status"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleClearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </Button>
        </div>
      </div>
      <TaskList filters={filters} users={users} />
    </div>
  );
};

export default Home;

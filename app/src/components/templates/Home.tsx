"use client";

import React, { useState } from "react";
import TaskList from "../organisms/TaskList";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/taskSlice";
import { logout } from "@/store/authSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    priority: "",
    dueDate: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </Button>
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
            name="title"
          />
          <Input
            id="dueDate"
            label="Due Date"
            type="date"
            value={filters.dueDate}
            onChange={handleFilterChange}
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
        <Button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </Button>
      </div>
      <TaskList />
    </div>
  );
};

export default Home;

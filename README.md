# Task Management System

## Project Idea

Develop a task management system that allows users to create, edit, and delete tasks. The application provides features for user authentication, task management, dashboard reporting, and search/filter functionalities.

## Description

This task management system enables users to effectively manage their tasks by providing features for creating, editing, deleting, and searching tasks. It includes user authentication and authorization mechanisms to ensure secure access. The system also offers a comprehensive dashboard for users to view their tasks, track overdue tasks, and monitor outstanding tasks.

## Features

### User Authentication and Authorization
- Users can sign up and log in.
- Secure authentication and authorization mechanisms using JWT.

### Task Management
- Users can create tasks with details like title, description, due date, priority, and status.
- Tasks can be edited or deleted by their respective owners.

### Dashboard and Reporting
- Users can view a dashboard displaying their tasks and overdue tasks.
- Display the number of days a task might be overdue.
- Display a count of the tasks outstanding per user.

### Search and Filters
- Users can search for tasks by title, description, assignee, status, etc.
- Filter tasks based on criteria like due date, priority, or status.

### Security and Data Protection
- Secure authentication and authorization mechanisms.
- Implement data validation and protection against common security threats.
- Data is stored in a PostgreSQL database.

## Technologies

### Backend
- **Nest.js**: For building the backend API with TypeScript.
- **TypeORM**: For database interaction, supporting SQL databases respectively.
- **JWT**: For implementing authentication and authorization.

### Frontend
- **Next.js 14**: For developing the React frontend to interact with the backend API.
- **Tailwind CSS**: For styling the frontend.
- **Redux**: For state management.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Project Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/AnguleMathias/nagging-panda.git
   ```
2. Install dependencies:
   ```sh
   cd nagging-panda
   npm install
   npm run install:dependencies
   ```
3. Configure the environment variables in a `.env` file:
   ```sh
   cd api
   an example is shared in api/.env.example
   ```
4. Start the server concurrently while at project root:
   ```sh
   npm run dev
   ```


### Running the Application

- Visit `http://localhost:3000` to access the frontend.
- The backend API will be running on `http://localhost:8080`.
- The API documentation will be running on `http://localhost:8080/api`

## Usage

### User Authentication

- Sign up for a new account.
- Log in with your credentials to access the task management features.

### Task Management

- Create new tasks with title, description, due date, priority, and status.
- Edit or delete existing tasks.

### Dashboard

- View your tasks and overdue tasks on the dashboard.
- Check the number of days a task is overdue and the count of outstanding tasks.

### Search and Filters

- Use the search bar to find tasks by title, description, assignee, status, etc.
- Apply filters to narrow down tasks based on due date, priority, or status.

---

Developed with ❤️ by [Mathias Angule].
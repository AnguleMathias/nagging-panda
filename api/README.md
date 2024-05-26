# Task Management API

This API is designed for managing tasks, providing user authentication, and offering a dashboard with task statistics. It is built with NestJS and utilizes JWT for authentication.

## Table of Contents

- [Installation](#installation)
- [Setting Up](#setting-up)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
  - [Auth Routes](#auth-routes)
  - [Task Routes](#task-routes)
  - [Dashboard Route](#dashboard-route)
- [Swagger Documentation](#swagger-documentation)

## Installation

Clone the repository and install the dependencies:

git clone https://github.com/your-repository/task-management-api.git
cd task-management-api
npm install
```

## Setting Up

1. Create a `.env` file at the root of your project and add the following environment variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database
JWT_SECRET=jwt_secret
```

2. Ensure your database is running and accessible with the credentials provided in the `.env` file.

## Running the Application

Start the NestJS application:

```sh
npm run start
```

The application will run on `http://localhost:8080`.

## API Routes

### Auth Routes

#### Sign Up

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Body**:

```json
{
  "username": "john_doe",
  "password": "password123",
  "email": "john_doe@example.com"
}
```

- **Response**:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "john_doe",
  "email": "john_doe@example.com",
  "createdAt": "2024-05-01T00:00:00Z",
  "updatedAt": "2024-05-01T00:00:00Z"
}
```

#### Log In

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

- **Response**:

```json
{
  "access_token": "jwt_token"
}
```

### Task Routes

#### Create a Task

- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer jwt_token`
- **Body**:

```json
{
  "title": "Finish the report",
  "description": "Complete the quarterly report by end of the week",
  "due_date": "2024-05-26T00:00:00Z",
  "priority": "High",
  "status": "Pending",
  "assignee": "123e4567-e89b-12d3-a456-426614174001"
}
```

- **Response**:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "title": "Finish the report",
  "description": "Complete the quarterly report by end of the week",
  "due_date": "2024-05-26T00:00:00Z",
  "priority": "High",
  "status": "Pending",
  "assignee": "123e4567-e89b-12d3-a456-426614174001",
  "createdAt": "2024-05-01T00:00:00Z",
  "updatedAt": "2024-05-01T00:00:00Z"
}
```

#### Get a Task by ID

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token`
- **Response**:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "title": "Finish the report",
  "description": "Complete the quarterly report by end of the week",
  "due_date": "2024-05-26T00:00:00Z",
  "priority": "High",
  "status": "Pending",
  "assignee": "123e4567-e89b-12d3-a456-426614174001",
  "createdAt": "2024-05-01T00:00:00Z",
  "updatedAt": "2024-05-01T00:00:00Z"
}
```

#### Update a Task

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer jwt_token`
- **Body**:

```json
{
  "title": "Finish the report ASAP",
  "description": "Complete the quarterly report by tomorrow",
  "due_date": "2024-05-25T00:00:00Z",
  "priority": "High",
  "status": "In Progress",
  "assignee": "123e4567-e89b-12d3-a456-426614174001"
}
```

- **Response**:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "title": "Finish the report ASAP",
  "description": "Complete the quarterly report by tomorrow",
  "due_date": "2024-05-25T00:00:00Z",
  "priority": "High",
  "status": "In Progress",
  "assignee": "123e4567-e89b-12d3-a456-426614174001",
  "createdAt": "2024-05-01T00:00:00Z",
  "updatedAt": "2024-05-20T00:00:00Z"
}
```

#### Delete a Task

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer jwt_token`
- **Response**:

```json
{
  "message": "Task deleted successfully"
}
```

### Dashboard Route

#### Get Dashboard Data

- **URL**: `/tasks/dashboard/:userId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt_token`
- **Response**:

```json
{
  "totalTasks": 5,
  "outstandingTasks": 3,
  "overdueTasks": 2,
  "overdueTaskDetails": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174002",
      "title": "Finish the report",
      "description": "Complete the quarterly report by end of the week",
      "due_date": "2024-05-20T00:00:00Z",
      "priority": "High",
      "status": "Pending",
      "assignee": "123e4567-e89b-12d3-a456-426614174001",
      "createdAt": "2024-05-01T00:00:00Z",
      "updatedAt": "2024-05-01T00:00:00Z",
      "overdueDays": 6
    }
  ]
}
```

### Swagger Documentation

The API documentation is generated using Swagger. You can access the Swagger UI at:

```
http://localhost:8080/api
```

This provides a user-friendly interface to explore and test the API endpoints.

## Contributing

TBA

## License

This project is licensed under the MIT License.

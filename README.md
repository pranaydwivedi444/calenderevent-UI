# MERN Stack Calendar Week View with Events Project

## Overview

This project is a **Calendar Week View** application built with the MERN stack. It allows users to create, view, and manage events. Authentication is implemented using **JWT** for secure login and registration.

## Folder Structure

- **Frontend**: Contains the React application. Start it using `npm run dev`.
- **Backend**: Contains the Express.js application.

## Configuration

To configure the project:

1. Update the `config` file in the **Frontend** to set your backend URL.
2. Create an `.env` file in the **Backend** directory with the following variables:

```env
DATABASE_URL=ProdDbURL
PORT=3000
JWT_SECRET=yourjwtscrent
NODE_ENV=development
```

## Getting Started

### Frontend

1. Navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Start the development server with:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Initialize Prisma and the database with:
   ```bash
   npx prisma migrate
   npx prisma generate
   ```
4. Start the server with:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes

Base URL: `/api/auth`

- **Register User**: `POST /register`

  - Description: Creates a new user account.

- **Login User**: `POST /login`

  - Description: Authenticates a user and returns a JWT.

- **Logout User**: `POST /logout`

  - Description: Logs out the user and invalidates the session.

### Event Routes

Base URL: `/api/events`

- **Create Event**: `POST /event`

  - Description: Adds a new event.

- **Get User Events**: `GET /events`

  - Description: Retrieves all events for the logged-in user.

## Running Notes

- Make sure your `DATABASE_URL` in the `.env` file points to your production or development database.
- Prisma migrations need to be applied using `npx prisma migrate` before starting the backend.

## Features

- **Authentication**:
  - Secure JWT-based login and registration.
- **Event Management**:
  - Create and view weekly events.
- **Frontend**:
  - Built using React for an intuitive and responsive user interface.

## Commands Summary

### Frontend

- Start Development Server: `npm run dev`

### Backend

- Install Dependencies: `npm install`
- Prisma Migrations: `npx prisma migrate`
- Prisma Code Generation: `npx prisma generate`
- Start Backend Server: `npm start`


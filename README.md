# User and Document Management System

A backend system built with NestJS for managing users, documents (with file uploads), document ingestion triggers, and secure authentication using JWT. Includes role-based access control and standardized API responses.

## Tech Stack

- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM

---

##  How to Run Locally

###  Backend Setup
1. Navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
3. Start the backend server:
    ```bash
    npm run start:dev
4. The API will be live at:
    ```bash
    http://localhost:3000/
    
###  Database Setup
1. Run psql and Connect to PostgreSQL:
    ```bash
   psql -U postgres
2. Once inside psql, create the DB:
    ```bash
   CREATE DATABASE doc_mgmt;
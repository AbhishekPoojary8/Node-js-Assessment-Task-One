**Node.js Assessment Task One**

This project is a Node.js server application developed using TypeScript with a class-based architecture. The server includes several APIs for handling CSV uploads, retrieving user policies, and aggregating policies.

**Table of Contents**

**Project Overview**

Features
Setup
API Endpoints
Rate Limiting
Contributing
License
Project Overview
This server application provides APIs to:

**Upload CSV files.**
Retrieve policies for a specific user.
Aggregate policies across all users.
The application is built with TypeScript and follows a class-based architecture for better maintainability and scalability.

**Features**
CSV Upload API: Allows users to upload CSV files and processes them asynchronously using worker threads.
Get User Policy API: Retrieves policies associated with a specific user based on their email or username.
Aggregate Policy API: Aggregates policy information for all users, providing insights into policy distribution.
Setup
Prerequisites
Node.js (>=14.x)
npm or yarn
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/AbhishekPoojary8/Node-js-Assessment-Task-One.git
cd Node-js-Assessment-Task-One
Install dependencies:

bash
Copy code
npm install
or

bash
Copy code
yarn install
Create a .env file in the root directory and add your environment variables:

makefile
Copy code
PORT=3000
MONGO_URI=<Your MongoDB Connection String>
Compile TypeScript files:

bash
Copy code
npm run build
Start the server:

bash
Copy code
npm run dev
API Endpoints
1. Upload CSV
Endpoint: POST /api/upload-csv
Description: Uploads a CSV file for processing.
Request: Form-data with a file input (file).
Response: Success or error message.
2. Get User Policy
Endpoint: GET /api/find-user-policy?userName=Lura Lucca
Description: Retrieves policies for a specific user.
Query Parameters:
email (optional): Email of the user.
userName (optional): Username of the user.
Response: List of policies or error message.
3. Aggregate Policy
Endpoint: GET /api/aggregate-user-policies
Description: Aggregates policy information across all users.
Response: Aggregated policy data.

**Rate Limiting**
Rate limiting is implemented to prevent abuse of the API. Each endpoint has specific rate limits configured to ensure fair usage.

**Worker Threads**
Worker Threads
Worker threads in Node.js allow you to execute JavaScript code in parallel threads, which can be particularly useful for offloading CPU-intensive tasks. In this project, worker threads are used to handle the processing of CSV files asynchronously. This approach helps prevent the main event loop from being blocked, improving the application's responsiveness and scalability.

**Race Condition**
In scenarios where concurrent data access might occur, you could use MongoDB's built-in mechanisms or application-level strategies to handle potential race conditions. For example, if you’re updating user policies, ensure that operations are atomic and validate data integrity before applying changes.

**Contributing**
Feel free to fork the repository and submit pull requests. Please make sure to follow the coding standards and include appropriate tests.

**License**
This project is licensed under the MIT License - see the LICENSE file for details.


# Task Manager

A full-stack task management application to help you track and manage your tasks effectively. The project includes a React frontend and a Node.js backend with MongoDB for data persistence.

## Features
- Add tasks with a title and description.
- Mark tasks as complete.
- View all tasks or filter by status (completed/incomplete).
- Delete tasks you no longer need.
- Data persistence using MongoDB.

## Technologies Used
### Frontend
- React
- Axios for API calls
- Tailwind CSS (or your chosen styling framework)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

## Installation
### Prerequisites
- Node.js installed.
- MongoDB installed locally or an active MongoDB Atlas cluster.
- Git installed.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables:
   - In the `backend` folder, create a `.env` file and add:
     ```
     MONGO_URI=mongodb://localhost:27017/taskmanager
     PORT=5000
     ```
   - In the `frontend` folder, create a `.env` file and add:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```


5. Run the backend:
   ```bash
   cd backend
   npm start
   ```

6. Run the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

7. Open the application in your browser at `http://localhost:5173`.

## File Structure
```
task-manager/
├── backend/
│   ├── models/
│   │   └── Task.js          # Mongoose schema for tasks
│   ├── index.js            # Backend server
│   ├── package.json         # Backend dependencies and scripts
│   ├── .env                 # Backend environment variables
│   └── .gitignore           # Backend ignored files
├── frontend/
│   ├── src/
│   │   ├── assets/          # All the assets require
│   │   ├── App.jsx          # Main app entry
│   │   ├── App.css          # Main app entry
│   │   ├── index.css        # Main app entry
│   │   └── main.jsx         # React DOM rendering
│   ├── package.json         # Frontend dependencies and scripts
│   ├── vite.config.js       # Config of vite
│   └── .gitignore           # Frontend ignored files
├── README.md                # Project documentation
```

## API Endpoints
### Base URL
`http://localhost:5000/api`

### Endpoints
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/tasks`       | Get all tasks           |
| POST   | `/api/tasks`       | Add a new task          |
| PUT  | `/api/tasks/:id`   | Update task (mark done) |

| DELETE | `/api/tasks/:id`   | Delete a task           |

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

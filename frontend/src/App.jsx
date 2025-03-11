import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskSvg from './assets/task-square-svgrepo-com.svg'
function InputArea({ refreshTasks }) {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(40);

  const handleInput = (e) => {
    setText(e.target.value);
    setHeight(Math.min(e.target.scrollHeight, 200));
  };

  const addTask = async () => {
    if (!text.trim()) return;

    await axios.post("http://localhost:5000/api/tasks", { text });
    setText("");
    refreshTasks(); // Refresh task list after adding
  };

  return (
    <div className='flex'>
      <div className="bg-stone-800 w-full rounded-lg p-4">
        <textarea
          placeholder="Add tasks"
          className="rounded-lg w-full px-4 py-2 resize-none focus:outline-none leading-normal"
          style={{ minHeight: "40px", maxHeight: "200px", overflow: "hidden", height: height }}
          value={text}
          onInput={handleInput}
        ></textarea>
        <button onClick={addTask} className="bg-fuchsia-800 text-white rounded-lg p-3 mt-4">Add Task</button>
      </div>
    </div>
  );
}

function TaskList({ tasks, refreshTasks }) {
  return (
    <div className="rounded-lg w-full mt-4 p-4 text-center">
      <h2>Task List</h2>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {tasks.map(task => (
          <Card key={task._id} task={task} refreshTasks={refreshTasks} />
        ))}
      </div>
    </div>
  );
}

function Card({ task, refreshTasks }) {
  const deleteTask = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
    refreshTasks();
  };

  const toggleComplete = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { completed: !task.completed });
    refreshTasks();
  };

  return (
    <div className={`bg-stone-900 w-full rounded-lg border-1 border-stone-600 p-4 ${task.completed ? "opacity-50" : ""}`}>
      <div className="flex justify-between items-center">
        <img src={TaskSvg} className='w-5 h-5' alt="Task Icon" />
        <span className={`flex-1 text-left px-2 ${task.completed ? "line-through" : ""}`}>{task.text}</span>
        <button onClick={toggleComplete} className="text-green-400">✔</button>
        <button onClick={deleteTask} className="text-red-400">🗑</button>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/api/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="bg-stone-950 text-white w-full h-full">
        <div className="flex bg-zinc-800 justify-between p-4">
          <div className="w-2/3">
            <img alt="Logo"></img>
          </div>
          <div className="w-1/3 pr-4">
            <ul className="flex justify-between px-4">
              <li><div className='border-1 border-fuchsia-800 rounded-xl px-4 py-1'>Home</div></li>
              <li>About</li>
              <li>Services</li>
              <li><div className='bg-fuchsia-800 rounded-xl px-4 py-1'>Contact</div></li>
            </ul>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center items-center px-10 pt-20">
            <h3 className="text-8xl font-bold text-center">Simple Task <br />Management App</h3>
          </div>
          <div className="w-full flex flex-col justify-center py-10 px-80">
            <InputArea refreshTasks={fetchTasks} />
            <TaskList tasks={tasks} refreshTasks={fetchTasks} />
          </div>
        </div>
      </div>
    </>
  );
}



export default App;

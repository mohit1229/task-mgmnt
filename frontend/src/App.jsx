import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskSvg from './assets/task-square-svgrepo-com.svg'
function InputArea({ refreshTasks }) {
  const [text, setText] = useState("");

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const addTask = async () => {
    if (!text.trim()) return;

    await axios.post("http://localhost:5000/api/tasks", { text });
    setText(""); // Clear input
    refreshTasks();
  };

  return (
    <div className="flex items-center bg-stone-800 w-full rounded-lg p-4">
      <textarea
        placeholder="Add tasks"
        className="rounded-lg w-full px-4 py-2 resize-none focus:outline-none leading-normal"
        style={{
          height: "100px", // Fixed height
          maxHeight: "200px",
          overflowY: "auto", // Scroll pane always appears when needed
        }}
        value={text}
        onChange={handleInput} // Use `onChange` instead of `onInput`
      ></textarea>
      <button onClick={addTask} className="bg-fuchsia-800 text-white rounded-lg p-3 ml-4">
        <img
          alt="Send"
          src="https://img.icons8.com/?size=100&id=38865&format=png&color=000000"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}

function TaskList({ tasks, refreshTasks }) {
  return (
    <div className="rounded-lg w-full mt-4 p-4 text-center">
      <h2>Your tasks</h2>
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
    <div className={`bg-stone-900 w-full rounded-lg border border-stone-600 p-4 flex flex-col h-40 ${task.completed ? "opacity-50" : ""}`}>
      {/* Task Icon (Fixed Position) */}
      <div className="flex ">
        <img 
          src="https://img.icons8.com/?size=100&id=67671&format=png&color=FFFFFF" 
          className="w-10 h-10" 
          alt="Task Icon" 
        />
      </div>

      {/* Task Text (Scrollable if too long) */}
      <div 
        className={`flex-1 text-center px-4 overflow-hidden break-words overflow-y-auto ${task.completed ? "line-through" : ""}`}
        style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", maxHeight: "80px" }}
      >
        {task.text}
      </div>

      {/* Buttons Stuck to Bottom */}
      <div className="flex space-x-4 mt-auto pt-2">
        <button onClick={toggleComplete} className="text-green-400 w-5 h-5">
          <img 
            src="https://img.icons8.com/?size=100&id=11697&format=png&color=FFFFFF" 
            className="w-full h-full"
            alt="Complete"
          />
        </button>
        <button onClick={deleteTask} className="text-red-400 w-5 h-5">
          <img 
            src="https://img.icons8.com/?size=100&id=102550&format=png&color=000000" 
            className="w-full h-full"
            alt="Delete"
          />
        </button>
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
      <div className="flex bg-zinc-800 justify-between items-center p-4">
  <div>
    <img 
      alt="Logo" 
      src="https://img.icons8.com/?size=100&id=123740&format=png&color=000000" 
      className="w-10 h-10"
    />
  </div>
  <div>
    <ul className="flex items-center gap-6 px-4">
      <li><div className='border border-fuchsia-800 rounded-xl px-4 py-1 pb-1.5 inline-block'>Home</div></li>
      <li>About</li>
      <li>Services</li>
      <li><div className='bg-fuchsia-800 rounded-xl px-4 py-1 pb-1.5 inline-block'>Contact</div></li>
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

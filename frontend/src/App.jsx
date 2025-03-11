import { useState } from 'react';
import './App.css';
import TaskSvg from './assets/task-square-svgrepo-com.svg'
function InputArea() {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(40); // Initial height

  const handleInput = (e) => {
    setText(e.target.value);
    setHeight(Math.min(e.target.scrollHeight, 200)); // Grow until max height
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
            <button  className="bg-fuchsia-800 text-white rounded-lg p-3 mt-4 ">Add Task</button>
            </div>

    </div>
  );
}
function TaskList() {
  return (
    <div className=" rounded-lg w-full mt-4 p-4 text-center">Task List
    <div className='grid grid-cols-4 gap-4 mt-4'>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    
    </div>
    </div>
  );
}
function Card(){
  return (
    <div className="bg-stone-900 w-full rounded-lg border-1 border-stone-600 p-4">
      <div className="">
      {/* <img src="https://img.icons8.com/?size=100&id=24904&format=png&color=000000" className='w-5 h-5'></img> */}
      <img src={TaskSvg} className='w-5 h-5'></img>

        <div>Task 1</div>
        {/* <svg xmlns="{TaskSvg}" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"></svg> */}
        <div>🗑</div>
      </div>
    </div>
  );
}
function App() {
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
            <h3 className="text-8xl font-bold text-center">Simple Task <br></br>Management App</h3>
          </div>
          <div className="w-full flex flex-col justify-center py-10 px-80">
            <InputArea />
            {/* <button className="bg-fuchsia-800 text-white w-full rounded-lg p-4 mt-4">Add Task</button> */}
          <TaskList />

          </div>
        </div>
      </div>
    </>
  );
}

export default App;

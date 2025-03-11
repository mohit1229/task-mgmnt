import { useState } from 'react';
import './App.css';

function InputArea() {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(40); // Initial height

  const handleInput = (e) => {
    setText(e.target.value);
    setHeight(Math.min(e.target.scrollHeight, 200)); // Grow until max height
  };

  return (
    <div className="bg-stone-800 w-full rounded-lg p-4">
      <textarea
        placeholder="Add tasks"
        className="rounded-lg w-full px-4 py-2 resize-none focus:outline-none leading-normal"
        style={{ minHeight: "40px", maxHeight: "200px", overflow: "hidden", height: height }}
        value={text}
        onInput={handleInput}
      ></textarea>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="bg-stone-950 text-white w-full h-full">
        <div className="flex bg-zinc-800 justify-between p-4">
          <div className="w-1/2">
            <img alt="Logo"></img>
          </div>
          <div className="w-1/2 pr-4">
            <ul className="flex justify-between px-4">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li><button className='bg-fuchsia-800 rounded-xl px-4 py-1'>Contact</button></li>
            </ul>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center items-center px-10 py-20">
            <h3 className="text-6xl font-bold">Simple Task Management App</h3>
          </div>
          <div className="w-full flex flex-col justify-center py-10 px-80">
            <InputArea />
            <div className="border-4 rounded-lg border-fuchsia-800 w-full mt-4 p-4 text-center">Task List</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

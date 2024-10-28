import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import './App.css';

function App() {

  const [data, setData] = useState([]);

  const [text, setText] = useState("popup");

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  useEffect(()=> {

    var container = document.querySelector(".App");
container.addEventListener('click', function (event) {
  var x = event.clientX;
  var y = event.clientY;
  var ball = document.querySelector(".pop");
  ball.style.position = "absolute";
  ball.style.display = "block"
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
})

  },[]);

  return (
    <div className="App b bg-sky-950 text-white  overflow-scroll h-[100vh] w-[100vw] overflow-x-hidden">

      <div className="pop hidden absolute w-[300px] h-auto bg-black text-white p-4 rounded-xl">
        <h1 className="w-full text-center mb-3 text-base font-semibold">Displaying video for</h1>
        <p className="text-sm">{text}</p>
      </div>

      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />

      {data.length > 0 && (
        <table className="table text-white border-4">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border"
                  onMouseEnter={()=>{setText(value)}}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br /><br />
      ... webstylepress ...
    </div>
  );
}

export default App;

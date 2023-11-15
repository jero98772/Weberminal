import logo from './logo.svg';
import './App.css';
import {useState,useEffect,useRef} from 'react'

function App() {
  const [inputData, setInputData] = useState('');
  const [input,setInput]=useState("");
  const [output,setOutput]=useState("");
  const [responseData, setResponseData] = useState('');
  useEffect(() => {
    sendDataToFlask();
  }, []);

  
  const sendDataToFlask = async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await response.json();
      console.log('Response from Flask:', data);
      setResponseData(data.message); // Assuming the Flask response contains a 'message' key

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };


  return (
    <div className="App">

      :$ <input type="text"  value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{
      if( e.key==="Enter"){
          sendDataToFlask();
          let newOutput="";
          newOutput=":$ "+input+":\n"+responseData+"\n"+output+"\n";
          setOutput(newOutput)
          setInput("")
        }}
      }/>
      <hr/>
      <div className="terminal">
      <br/>
        {responseData}
        <br/>

        {output}
      </div>
    </div>
  );
}

export default App;

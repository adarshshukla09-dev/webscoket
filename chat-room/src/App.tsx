
import { useEffect, useRef, useState } from 'react'

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);        {/* @ts-ignore */}

  const wsRef = useRef();        {/* @ts-ignore */}

  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
   ws.onmessage = (event) => {
  const parsed = JSON.parse(event.data);
  setMessages(m => [...m, parsed.payload.message]);
};

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
    return () => {
      ws.close()
    }
  }, []);

  return (
    <div className='h-screen bg-black'>
      <br /><br /><br />
      <div className='h-[85vh]'>
        {messages.map(message => <div className='m-8'> 
          <span className='bg-white text-black rounded p-4 '>            
            {message} 
          </span>
        </div>)}
      </div>
      <div className='w-full bg-white flex'>
        {/* @ts-ignore */}
        <input ref={inputRef} id="message" className="flex-1 p-4"></input>
        <button onClick={() => {
                  {/* @ts-ignore */}

          const message = inputRef.current?.value;
          // @ts-ignore
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message
            }
          }))

        }} className='bg-purple-600 text-white p-4'>
          Send message
        </button>
      </div>
    </div>
  )
}

export default App
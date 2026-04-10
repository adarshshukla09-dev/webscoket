import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage]=useState<string[]>([])
  function onSubmit(event:any) {
    event.preventDefault();
    setIsLoading(true);
    
    
    socket.emit("sendInput", value);
    console.log(value)
    setMessage((prev)=>[...prev,value])
    setValue('')
    setIsLoading(false);
  }

  return (
    <>
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
        </form>
      <div>
        {message.map((msg, index) => (
          // Use index as a key for simple lists
          <p key={index}>{msg}</p>
        ))}
      </div>
          </>
  );
}
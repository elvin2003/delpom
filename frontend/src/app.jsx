import { useEffect, useState } from 'preact/hooks'
import io from 'socket.io-client';

const BACK_URL = "https://delpom-back.onrender.com";

const socket = io(BACK_URL);

export function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Event listener for incoming messages
    socket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    socket.on('user connected', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    socket.on('user disconnected', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });


    // Cleanup function to remove the event listener
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit('chat message', `${socket.id}: ${messageInput}`); // Send the message to the server
      setMessageInput(''); // Clear the input field
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App;

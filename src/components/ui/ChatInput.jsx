import { useState } from 'react';

function ChatInput() {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    console.log(`Sending message: ${message}`);

    setMessage('');
  };

  return (
    <div className="flex h-fit p-1">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow w-2/5 outline-none px-2 rounded-md"
        value={message}
        onChange={handleChange}
      />
      <button
        className="ml-2 bg-[#005DCA] text-white rounded-lg px-3 py-1"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;

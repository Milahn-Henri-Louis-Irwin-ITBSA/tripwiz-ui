import { useState } from 'react';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import { auth } from '@/utils/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput() {
  const [message, setMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [user] = useAuthState(auth);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    setSendLoading(true);

    const messageData = {
      message: message,
    };
    if (!user) return;
    const bearerToken = await user.getIdToken(true);
    console.log(bearerToken);

    fetch(import.meta.env.VITE_SUBMIT_FEED_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send message.');
        }
        setMessage('');
        setSendLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setSendLoading(false);
      });
  };

  return (
    <div className="flex h-fit p-1">
      <input
        type="text"
        placeholder="Type your message..."
        required
        className="flex-grow w-2/5 outline-none px-2 rounded-md"
        value={message}
        onChange={handleChange}
      />
      <button
        className="ml-2 bg-[#005DCA] text-white rounded-lg px-3 py-1"
        onClick={handleSend}
        disabled={sendLoading}
      >
        {sendLoading && <LoadingIndicator loadingMessage={'Sending'} />}
        {!sendLoading && 'Send'}
      </button>
    </div>
  );
}

export default ChatInput;

import { useState } from 'react';
import LoadingIndicator from '@/components/ui/LoadingIndicator';

function ChatInput() {
  const [message, setMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    console.log(`Sending message: ${message}`);

    setSendLoading(true);
    const messageData = {
      message: message,
    };

    const token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBkMGU4NmJkNjQ3NDBjYWQyNDc1NjI4ZGEyZWM0OTZkZjUyYWRiNWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGVucmkgTG91dyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMTkhIZG1DWUxpdENPRVk0WHdxNmJKY3NQYkMtN1U0c3FnY05XajNWR1R3aGs9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaXRic2EtaG9ub3Vycy1iYWNrZW5kIiwiYXVkIjoiaXRic2EtaG9ub3Vycy1iYWNrZW5kIiwiYXV0aF90aW1lIjoxNjk4Njg3OTY4LCJ1c2VyX2lkIjoiSzE1TFhtaVJ4R2hhSEU1M1gxRGlBaVJzZTVoMiIsInN1YiI6IksxNUxYbWlSeEdoYUhFNTNYMURpQWlSc2U1aDIiLCJpYXQiOjE2OTg2ODc5NjgsImV4cCI6MTY5ODY5MTU2OCwiZW1haWwiOiJoZW5yaWxvdXcwOTExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAzMDA4OTI3MzA5ODI1ODM1MTM0Il0sImVtYWlsIjpbImhlbnJpbG91dzA5MTFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Mju7PiR8yegV4c_fHdk8BzuszoneMQyoisLyEF4Dfjb3_5qT1yGbsp4O0RmGK-UpeNzSAR6-KU7c5rfHc0CKkRIVfI_jrCSOyU9oWs2DPiaQjTT-hExjeSLUtdWuwuYf1NX6fUUnW1bsbT6E7k-VfPyK84JbJ3oxh_WbBaRET8jv16aGWwxj1niKzD3SZRh_zIrr6kCn6FY8ds4GKaAMVvaI02daaE11XW2LBNAkUTQCMWHwXpsf8aC-Yhs45lv3mFPgoVZehb9oBVzCzimwCrO9QhaOZYnqY6KCnodrMQIZZWLGqxgZRz3zrlZPsg_bopnlChPw4iuD9J8y9ApCzg';

    fetch('http://127.0.0.1:3002/v1/api/feed/submitfeed', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => {
        console.log('100%', message);
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

import { useState } from 'react';


export default function Login() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
} 
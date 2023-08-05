import { useEffect, useState } from 'react';
import logo from '@/icons/SidebarLogo.png';
import { toast } from 'react-toastify';
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import GoogleIcon from '@/assets/google.png';
import { auth } from '@/utils/firebase-config';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import { useNavigate } from 'react-router';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, newUser, newLoading, newError] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  async function handleEmailAndPasswordSignIn() {
    try {
      if (!email || !password) {
        toast.error('Please fill in all fields');
        //toast
        return;
      }
      if (!email.length || !password.length) {
        toast.error('Please fill in all fields');
        // toast
        return;
      }

      await signInWithEmailAndPassword(email, password);
      if (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            toast.info('Creating new account');
            return await createNewAccount();
        }
      }
      toast.success('Login successful');
    } catch (e) {
      toast.error('Login failed');
      console.log(e);
      switch (e.code) {
        case 'auth/no-user':
          return; // create user func
      }
    }
  }
  async function createNewAccount() {
    try {
      const user = await createUserWithEmailAndPassword(email, password);
      if (newError) {
        return toast.error('Failed to create new account');
      }
      toast.success('New account created');
    } catch (e) {
      console.log(e);
    }
  }
  function isButtonDisabled() {
    return email.trim() === '' || password.trim() === '';
  }
  useEffect(() => {
    if (user || googleUser || newUser) {
      navigate('/');
    }
  }, [user, newUser, googleUser]);
  return (
    <div className="w-screen h-screen flex">
      <div className="w-2/3 h-screen flex items-center justify-center">
        <img src={logo} alt="logo" className="w-[20rem]" />
      </div>
      <div className="w-1/3 flex flex-col items-center justify-center gap-4 px-4">
        <span className="flex flex-col w-full gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            placeholder="milahn@gmail.com"
            className="outline-none border-b border-[#0896FC] px-4 py-2"
            onChange={({ target }) => setEmail(target.value.trim())}
          />
        </span>
        <span className="flex flex-col w-full gap-2">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="outline-none border-b border-[#0896FC] px-4 py-2"
            onChange={({ target }) => setPassword(target.value.trim())}
          />
        </span>
        <button
          onClick={handleEmailAndPasswordSignIn}
          disabled={isButtonDisabled()}
          className="w-full bg-[#0896FC] text-white px-4 py-2 rounded"
        >
          {loading ? (
            <LoadingIndicator loadingMessage="Validating..." />
          ) : (
            'SIGN IN'
          )}
        </button>
        {/* divider */}
        <div className="flex items-center gap-4">
          <span>OR</span>
        </div>
        <button
          onClick={() => signInWithGoogle()}
          className="w-full rounded bg-black px-4 py-2 flex items-center justify-center"
        >
          <img src={GoogleIcon} className="w-6" />
        </button>
      </div>
    </div>
  );
}

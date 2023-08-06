import { useEffect, useState } from 'react';
import Logo from '@/assets/LogoTrans.png';
import LogoText from '@/assets/LogoText.png';
import { toast } from 'react-toastify';
import {
  useAuthState,
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
  const [firebaseUser, firebaseLoadng, firebaseError] = useAuthState(auth);
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
    if (firebaseUser) {
      navigate('/');
    }
  }, [firebaseUser]);

  return (
    <div className="w-screen h-screen flex login-bg  items-center">
      <div className="w-2/3 h-screen flex items-center justify-center ">
        <img src={Logo} alt="logo" className="w-[20rem]" />
      </div>

      <div className="w-1/3 h-[75%] flex items-center justify-center border-l-4 border-l-white  z-20  ">
        <div class="card">
          <div class="card-details">
            <div className="flex justify-center mb-2 ">
              <img src={LogoText} alt="logo" className="w-[7.5rem]" />
            </div>
            <label
              for="input-group-1"
              class="block  text-base font-semibold text-gray-400"
            >
              Email
            </label>
            <div class="relative mb-2">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-[#0896FC] "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                value={email}
                id="input-group-1"
                className="bg-gray-50 input-border border-2 border-gray-400 focus:border-[#0896fc] text-[#0896fc] font-semibold outline-none text-sm rounded-lg  block w-full pl-10 p-2.5"
                placeholder="support@tripwhiz.com"
                onChange={({ target }) => setEmail(target.value.trim())}
              />
            </div>

            <label
              for="input-group-1"
              class="block  text-base font-semibold text-gray-400"
            >
              Password
            </label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="w-4 h-4 text-[#0896FC] "
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                id="input-group-1"
                className="bg-gray-50 input-border border-2 border-gray-400 focus:border-[#0896fc]  text-[#0896fc] font-semibold outline-none text-sm rounded-lg  block w-full pl-10 p-2.5"
                placeholder="support@tripwhiz.com"
                onChange={({ target }) => setPassword(target.value.trim())}
              />
            </div>

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

            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-400 font-semibold">OR</span>
            </div>
            <button
              onClick={() => signInWithGoogle()}
              className="w-full rounded bg-black px-4 py-2 flex items-center justify-center"
            >
              <img src={GoogleIcon} className="w-6" />
            </button>
          </div>
        </div>
        {/* <div className="shadow-2xl rounded-lg w-[75%] h-[50%] flex flex-col items-center justify-center gap-4 px-4 bg-white">
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

          <div className="flex items-center gap-4">
            <span>OR</span>
          </div>
          <button
            onClick={() => signInWithGoogle()}
            className="w-full rounded bg-black px-4 py-2 flex items-center justify-center"
          >
            <img src={GoogleIcon} className="w-6" />
          </button>
        </div> */}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0"
      >
        <path
          fill="#0896FC"
          fill-opacity="0.5"
          d="M0,256L60,261.3C120,267,240,277,360,250.7C480,224,600,160,720,160C840,160,960,224,1080,234.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

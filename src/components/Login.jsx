import { auth } from '@/utils/firebase-config';
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-fir ebase-hooks/auth';
import { useState } from 'react';

export default function Login() {
  const [count, setCount] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle, signInLoading] = useSignInWithGoogle(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
}
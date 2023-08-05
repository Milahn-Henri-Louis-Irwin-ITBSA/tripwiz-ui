import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase-config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
export default function UserInformation() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <img
      src={user?.photoURL}
      alt={user?.displayName}
      onClick={() => auth.signOut()}
      className="w-12 aspect-square rounded-full absolute right-0 top-0 z-[9999] mr-4 mt-4 border-2 border-[#0896FC]"
    />
  );
}

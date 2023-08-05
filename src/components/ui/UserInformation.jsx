import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase-config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Logo from '@/icons/SidebarLogo.png';
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
      src={user?.photoURL || Logo}
      alt={user?.displayName}
      onClick={() => auth.signOut()}
      className="w-14 aspect-square rounded-full absolute object-cover right-0 top-0 z-[9999] mr-4 mt-4 border-2 border-[#0896FC] cursor-pointer hover:scale-110  hover:rotate-180 transition-all duration-300"
    />
  );
}

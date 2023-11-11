import FeedIncoming from '@/components/ui/FeedIncoming';
import ChatInput from '@/components/ui/ChatInput';
import { useState, useEffect } from 'react';
import { auth, db } from '@/utils/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
export default function Feed({ showFeed, setShowFeed }) {
  const q = query(collection(db, 'feed'), orderBy('created_at', 'asc'));
  const [user] = useAuthState(auth);
  const [feedData, setfeedData] = useState([]);
  const [snapshot] = useCollection(q);

  useEffect(() => {
    if (!user) return;
    if (!snapshot) return;
    const feedData = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        created_at: data.created_at,
        message: data.message,
        created_by_pic: data.created_by_pic,
        message_id: doc.id,
        spam: data.spam,
      };
    });
    setfeedData(feedData);
  }, [user, snapshot]);

  useEffect(() => {
    const mainFeed = document.getElementById('main-feed');
    if (!mainFeed) return;

    // Use setTimeout to ensure the content has been updated

    mainFeed.scrollTop = mainFeed.scrollHeight + 10;
  }, [feedData, showFeed]);

  if (!showFeed || !setShowFeed) {
    return null;
  }

  return (
    <div className="h-[45dvh] w-[20rem] absolute  right-5 top-24 z-[99999] bg-slate-100 rounded-3xl shadow-xl">
      <div className="h-1/5 p-4 bg-[#005DCA] rounded-l-3xl rounded-r-3xl rounded-br-none rounded-bl-none">
        <div className="h-[10px] pt-2 flex items-center justify-end ">
          <svg
            onClick={() => setShowFeed(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div className="h-full flex items-center justify-center">
          <h1 className="text-white text-2xl font-normal">Community Feed</h1>
        </div>
      </div>
      <div className="h-4/5 flex flex-col p-4">
        <div
          id="main-feed"
          className="grid grid-cols-5 gap-2 overflow-y-scroll overflow-x-hidden no-scrollbar h-5/6"
        >
          {feedData.map((data, indx) => (
            <FeedIncoming data={data} key={indx} />
          ))}
        </div>
        <div className="flex items-end h-1/6">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

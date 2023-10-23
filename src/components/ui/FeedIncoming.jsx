// eslint-disable-next-line react/prop-types
import MessageIcon from '@/icons/Message.png';
export default function FeedIncoming({ message }) {
  return (
    <>
      <div className=" flex justify-center">
        <img
          className="w- rounded-full aspect-sqaure object-contain"
          src={MessageIcon}
          alt="Message Icon"
        />
      </div>
      <div className="col-span-4 p-1 rounded-md bg-slate-300">
        <p className="font-semibold text-xs">{message}</p>
      </div>
    </>
  );
}

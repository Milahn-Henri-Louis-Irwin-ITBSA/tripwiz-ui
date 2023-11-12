// eslint-disable-next-line react/prop-types
import MessageIcon from '@/icons/Message.png';
// eslint-disable-next-line react/prop-types
export default function FeedIncoming({ data }) {
  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center">
        <img
          className="rounded-full h-12 w-12"
          src={data?.created_by_pic || MessageIcon}
          alt="Message Icon"
        />
      </div>
      <div className="col-span-4 p-1 rounded-md bg-slate-300 flex flex-col min-h-12 max-h-fit">
        <div className="flex items ">
          {data?.spam ? (
            <p className="font-bold text-xs text-red-700 flex align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-ban me-1 w-4"
                viewBox="0 0 16 16"
              >
                <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8ZM2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z" />
              </svg>
              <span className="italic">SPAM MESSAGE DETECTED</span>
            </p>
          ) : (
            <p className="font-semibold text-xs">{data?.message}</p>
          )}
        </div>
        <div className="mt-auto">
          <p className="text-[10px] font-normal text-[#00669C] flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-clock w-[10px] me-[3px]"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg>
            {data?.created_at.toDate().toLocaleString('en-za')}
          </p>
        </div>
      </div>
    </>
  );
}

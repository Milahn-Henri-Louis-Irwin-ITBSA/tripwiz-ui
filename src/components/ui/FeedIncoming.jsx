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
        <div className="flex items">
          <p className="font-semibold text-xs">{data?.message}</p>
        </div>
        <div className="mt-auto">
          <p className="text-xs font-extralight text-[#00669C]">
            {data?.created_at.toDate().toLocaleString('en-za')}
          </p>
        </div>
      </div>
    </>
  );
}

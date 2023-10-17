import FeedIncoming from './ui/FeedIncoming';

export default function Feed() {
  return (
    <div className="h-[45dvh] w-[20rem] absolute  right-5 top-24 z-[99999] bg-slate-100 rounded-3xl ">
      <div className="h-1/5 p-4 bg-[#005DCA] rounded-l-3xl rounded-r-3xl rounded-b-none">
        <div className="h-[10px] pt-2 flex items-center justify-end ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div className="h-full flex items-center justify-center">
          <h1 className="text-white text-2xl font-semibold">COMMUNITY FEED</h1>
        </div>
      </div>
      <div className="h-4/5 flex flex-col  p-4">
        <div className="grid grid-cols-5 gap-2">
          <FeedIncoming
            message={
              'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
            }
          />
        </div>
      </div>
    </div>
  );
}

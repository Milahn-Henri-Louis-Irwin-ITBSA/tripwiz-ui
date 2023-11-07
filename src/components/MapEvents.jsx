import Police from '../assets/Police.png';
import Ambulance from '../assets/Ambulance.png';
import Fireman from '../assets/Fireman.png';
import Animal from '../assets/Animal.png';
import Roadwork from '../assets/Roadwork.png';

export default function Feed({ showEvent, setShowEvent }) {
  if (!showEvent || !setShowEvent) {
    return null;
  }

  return (
    <div className="h-[23dvh] w-[30rem] absolute  bottom-5 right-[37.5%] z-[99999] bg-slate-100 rounded-3xl shadow-xl">
      <div className="h-1/4 p-1 bg-[#005DCA] rounded-l-3xl rounded-r-3xl rounded-br-none rounded-bl-none">
        <div className="h-full flex items-center justify-center">
          <h1 className="text-white text-2xl text-center  font-normal w-[90%] ps-4">
            Please Select Event
          </h1>
          <svg
            onClick={() => setShowEvent(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer "
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      </div>
      <div className="h-3/4 flex flex-col p-4 ">
        <div className="grid grid-cols-5 gap-4 mb-2">
          <div className="cursor-pointer">
            <img
              src={Police}
              alt="Police"
              className="active:border-red-500 border-2 rounded-full"
            />
          </div>
          <div className="cursor-pointer">
            <img src={Fireman} alt="Police" />
          </div>
          <div className="cursor-pointer">
            <img src={Ambulance} alt="Police" />
          </div>
          <div className="cursor-pointer">
            <img src={Roadwork} alt="Police" />
          </div>
          <div className="cursor-pointer">
            <img src={Animal} alt="Police" />
          </div>
        </div>
        <form>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              disabled
              className="z-20 block w-full rounded-xl border border-l-2 p-2.5 text-sm bg-white text-gray-900 focus:outline-none disabled:bg-slate-200 disabled:cursor-not-allowed"
              placeholder="Short description of what happened"
              required
            />
            <button
              disabled
              type="submit"
              className="absolute right-0 top-0 h-full rounded-r-xl border border-[#005DCA] bg-[#005DCA] p-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

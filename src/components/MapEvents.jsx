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
    <div className="h-[15dvh] w-[30rem] absolute  bottom-5 right-[37.5%] z-[99999] bg-slate-100 rounded-3xl shadow-xl">
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
        <div className="grid grid-cols-5 gap-4">
          <div className="cursor-pointer">
            <img src={Police} alt="Police" />
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
      </div>
    </div>
  );
}

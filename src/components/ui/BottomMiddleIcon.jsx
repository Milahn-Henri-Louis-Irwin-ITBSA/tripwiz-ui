import ExpandUp from '../../assets/ExpandRight.png';
export default function BottomMiddleIcon({ showEvent, setShowEvent }) {
  if (showEvent) {
    return null;
  }

  return (
    <div className="absolute bottom-5 right-[50%] z-[9999]">
      <img
        className="w-10 -rotate-90 cursor-pointer"
        src={ExpandUp}
        alt="Expand Menu"
        onClick={() => setShowEvent(true)}
      />
    </div>
  );
}

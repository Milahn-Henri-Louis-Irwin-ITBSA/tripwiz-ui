import ExpandLeft from '../../assets/ExpandLeft.png';
export default function TopLeftAdditionalIcons({ showFeed, setShowFeed }) {
  if (showFeed) {
    return null;
  }

  return (
    <div className="absolute top-24 right-5 z-[9999]">
      <img
        className="w-10 cursor-pointer"
        src={ExpandLeft}
        alt="Expand Menu"
        onClick={() => setShowFeed(true)}
      />
    </div>
  );
}

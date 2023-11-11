import ExpandRight from '../../assets/ExpandRight.png';
export default function TopLeftAdditionalIcons({
  showSidebar,
  setShowSidebar,
}) {
  if (showSidebar) {
    return null;
  }

  return (
    <div className="absolute top-24 left-4 z-[9999]">
      <img
        className="w-10 cursor-pointer"
        src={ExpandRight}
        alt="Expand Menu"
        onClick={() => setShowSidebar(true)}
      />
    </div>
  );
}

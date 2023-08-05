export default function TopLeftAdditionalIcons({
  showSidebar,
  setShowSidebar,
}) {
  if (showSidebar) {
    return null;
  }

  return (
    <div className="absolute top-24 left-4 z-[9999]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-arrow-bar-right cursor-pointer hover:scale-100 transition-all duration-300"
        viewBox="0 0 16 16"
        onClick={() => setShowSidebar(true)}
      >
        <path
          fillRule="evenodd"
          d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"
        />
      </svg>
    </div>
  );
}

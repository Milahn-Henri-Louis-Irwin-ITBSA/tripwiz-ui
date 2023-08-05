import SidebarItem from '@/components/ui/SidebarItem';
import Logo from '@/icons/SidebarLogo.png';
export default function Sidebar({ showSidebar, setShowSidebar }) {
  if (!showSidebar) {
    return null;
  }
  return (
    <div className="h-[95dvh] w-[20rem] absolute left-5 top-5 z-[99999] bg-slate-100 rounded-3xl">
      <div className="h-2/6 p-2">
        <div className="h-[10px] pt-2 flex items-center justify-start">
          <svg
            onClick={() => setShowSidebar(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="black"
            className="bi bi-arrow-bar-left cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
            />
          </svg>
        </div>
        <div className="h-full flex items-center justify-center">
          <img
            id="logo"
            src={Logo}
            alt="logo"
            className="w- rounded-full aspect-sqaure object-cover"
          />
        </div>
      </div>
      <div className="h-4/6 flex flex-col justify-start items-center py-4 px-2 font-bold">
        <SidebarItem name="HOME" />
      </div>
    </div>
  );
}

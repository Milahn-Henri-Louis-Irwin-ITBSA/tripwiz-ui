import SidebarItem from '@/components/ui/SidebarItem';
import Logo from '@/icons/SidebarLogo.png';
export default function Sidebar({ showSidebar, setShowSidebar }) {
  if (!showSidebar) {
    return null;
  }
  return (
    <div className="h-[95dvh] w-[20rem] absolute left-5 top-5 z-[99999] bg-slate-100 rounded-3xl shadow-xl">
      <div className="h-2/6 py-5 px-5">
        <div className="h-[10px] pt-2 flex items-center justify-start">
          <svg
            onClick={() => setShowSidebar(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
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

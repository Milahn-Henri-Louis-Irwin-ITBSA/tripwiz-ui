// eslint-disable-next-line react/prop-types
export default function SidebarItem({ name }) {
  return (
    <div className="cursor-pointer">
      <h1>{name}</h1>
    </div>
  );
}

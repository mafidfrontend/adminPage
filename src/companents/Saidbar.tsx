import { NavLink } from "react-router";

function Saitbar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-35 bg-gray-900 text-white shadow-lg p-4 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-center mb-4">Dashboard</h2>
      {[
        { to: "/user", label: "Users" },
        { to: "/banners", label: "Banners" },
        { to: "/orders", label: "Orders" },
        { to: "/products", label: "Products" },
        { to: "/catigories", label: "Categories" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `p-3 rounded-lg text-center transition-all duration-300 ${
              isActive
                ? "bg-white text-gray-900 font-bold"
                : "bg-gray-800 hover:bg-gray-700"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Saitbar;
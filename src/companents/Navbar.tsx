import { Route, Routes } from "react-router";
import Saitbar from "./Saidbar";
import User from "../_companents/user/User";
import Orders from "../_companents/Orders/Orders";
import Catigories from "../_companents/catigories/Catigories";
import Products from "../_companents/products/Products";
import Banners from "../_companents/banners/Banerlar";

function Navbar() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center bg-gray-900 p-4 text-white shadow-lg rounded-lg">
        <div className="text-2xl font-bold tracking-wide">Mafid</div>
        <div className="flex items-center space-x-3">
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="User Avatar"
          />
          <div className="text-sm">
            <p className="font-semibold">Abdulloh</p>
            <p className="text-gray-300">123</p>
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <Saitbar />
        <div className="w-full p-4">
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/catigories" element={<Catigories />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

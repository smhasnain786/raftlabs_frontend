import { Link } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="bg-gray-50">
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

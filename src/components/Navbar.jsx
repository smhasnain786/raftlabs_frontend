import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { ShoppingCart, Utensils } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    setTotalItems(total);
  }, [cart]);
  const total = cart.r;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 glass-effect shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer smooth-transition hover:scale-105">
            <Utensils
              size={32}
              color="#ff6b35"
              strokeWidth={4}
              absoluteStrokeWidth
            />
            <span className="text-3xl font-display font-bold text-gradient">
              FoodFlow
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => navigate("/")}
              className="nav-btn px-6 py-2.5 rounded-xl font-medium smooth-transition text-gray-600 hover:text-primary hover:bg-orange-50"
              id="nav-menu"
            >
              Menu
            </button>
            <button
              onClick={() => showView("tracking")}
              className="nav-btn px-6 py-2.5 rounded-xl font-medium smooth-transition text-gray-600 hover:text-primary hover:bg-orange-50"
              id="nav-tracking"
            >
              Track Order
            </button>
          </nav>

          <button
            onClick={() => navigate("/cart")}
            className="relative btn-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            <ShoppingCart
              size={1}
              color="#643030"
              strokeWidth={3}
              absoluteStrokeWidth
            />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#eff30b] text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center badge-pop">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

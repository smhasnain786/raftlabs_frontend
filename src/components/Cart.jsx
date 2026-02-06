import { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { placeOrder } from "../services/api";
import { Minus, MoveLeft, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart({ onOrderPlaced }) {
  const { cart, clearCart, removeFromCart, updateQuantity } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const TAX_RATE = 0.08;
  const DELIVERY_FEE = cart.length > 0 ? 3.99 : 0;

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;

  const navigate = useNavigate();

  const checkout = async () => {
    const order = {
      items: cart.map((i) => ({ menuId: i.id, qty: i.qty })),
      customer,
    };
    const res = await placeOrder(order);
    clearCart();
    onOrderPlaced(res.id);
  };

  return (
    <div id="cart-view" className="view-container ">
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <MoveLeft size={20} />
          Continue Shopping
        </button>

        <h2 className="text-4xl font-display font-bold text-gray-900">
          Your Cart
        </h2>
      </div>

      {cart.length !== 0 && (
        <div id="cart-content" className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              return (
                <div
                  className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-6 slide-in"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                      {item.description}
                    </p>
                    <span className="text-2xl font-display font-bold text-primary">
                      Rs {item.price?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-gray-100 rounded-xl px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 smooth-transition shadow-sm"
                      >
                        <Minus size={32} color="#000000" strokeWidth={3} />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 smooth-transition shadow-sm"
                      >
                        <Plus size={32} color="#000000" strokeWidth={3} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 smooth-transition"
                    >
                      <Trash2 size={32} color="#ff1414" strokeWidth={3} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-display font-bold text-gray-900">
                      Rs{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-md sticky top-24">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>Rs {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>Rs {DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">Rs {total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full btn-primary text-white px-6 py-4 rounded-xl font-bold text-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}


      {cart.length === 0 && (<div id="empty-cart" className="text-center py-20 ">
        <ShoppingBag size={128} color="#e5e7eb" strokeWidth={2} className="mx-auto mb-6" />
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-3">
          Your cart is empty
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Add some delicious items to get started!
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg"
        >
          Browse Menu
        </button>
      </div>)}
      
    </div>
  );
}

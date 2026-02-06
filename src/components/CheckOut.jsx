import { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { placeOrder } from "../services/api";
import {
  MoveLeft,
  CreditCard,
  MapPin,
  User,
  User2,
  MapPinCheck,
  CreditCardIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ onOrderPlaced }) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    instructions: "",
  });

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const TAX_RATE = 0.08;
  const DELIVERY_FEE = cart.length ? 3.99 : 0;

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      items: cart.map((i) => ({ menuId: (i.id).toString(), qty: i.qty })),
      customer,
    };

    const res = await placeOrder(order);
    clearCart();
    navigate("/track/" + res.id);
  };

  return (
    <div id="checkout-view" className="view-container">
      <div className="mb-8">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center text-gray-600 hover:text-primary smooth-transition mb-6"
        >
          <MoveLeft className="mr-2" />
          Back to Cart
        </button>
        <h2 className="text-4xl font-display font-bold text-gray-900">
          Checkout
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* <!-- Checkout Form --> */}
        <div className="lg:col-span-2">
          <form id="checkout-form" className="space-y-8">
            {/* <!-- Contact Information --> */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-display font-semibold mb-6 flex items-center">
                <User2 className="text-primary mr-3" />
                Contact Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl smooth-transition"
                  />
                </div>
              </div>
            </div>

            {/* <!-- Delivery Address --> */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-display font-semibold mb-6 flex items-center">
                <MapPinCheck className="text-primary mr-3" />
                Delivery Address
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    name="address"
                    placeholder="Street Address"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl smooth-transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      name="city"
                      placeholder="City"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl smooth-transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      name="zipCode"
                      placeholder="ZIP Code"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl smooth-transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full btn-primary text-white px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center"
            >
              <CreditCardIcon  />
              Place Order - Rs <span></span> <span id="checkout-total"> {total.toFixed(2)}</span>
            </button>
          </form>
        </div>

        {/* <!-- Order Summary Sidebar --> */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-md sticky top-24">
            <h3 className="text-2xl font-display font-semibold mb-6">
              Order Summary
            </h3>
            <div id="checkout-items" className="space-y-4 mb-6">
              {/* <!-- Items will be inserted here --> */}
              {cart.map((item) => {
                return (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="bg-orange-100 text-primary font-semibold px-2 py-1 rounded-lg text-sm">
                        {item.qty}x
                      </span>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold">
                      Rs {(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>
                  Rs <span id="checkout-subtotal">{subtotal.toFixed(2)}</span>
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>
                  Rs <span id="checkout-tax">{tax.toFixed(2)}</span>
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>
                  Rs <span id="checkout-delivery">3.99</span>
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">
                  Rs <span id="checkout-total-sidebar">{total.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

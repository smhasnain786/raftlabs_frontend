import { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { placeOrder, fetchOrder } from "../services/api";
import {
  MoveLeft,
  CreditCard,
  MapPin,
  User,
  User2,
  MapPinCheck,
  CreditCardIcon,
  CheckCircle,
  Utensils,
  HomeIcon,
  Truck,
  Box,
  TruckIcon,
  Clock,
  CircleCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Checkout({ onOrderPlaced }) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    let intervalId;

    const loadOrder = async () => {
      try {
        const data = await fetchOrder(orderId);
        setOrder(data);

        // stop polling once delivered
        if (data?.status === "delivered") {
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadOrder();
    intervalId = setInterval(loadOrder, 15000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    instructions: "",
  });

  const total = order?.items.reduce((sum, i) => sum + i.price * i.qty, 0) || 0;

  const STATUS_ORDER = [
    "Order Received",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered",
  ];

  const currentIndex = STATUS_ORDER.indexOf(order?.status);

  const isActive = (status) => STATUS_ORDER.indexOf(status) <= currentIndex;

  return (
    <div id="tracking-view" className="view-container   ">
      <div className="mb-8">
        <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
          Order Tracking
        </h2>
        <p className="text-gray-600">
          Order #<span id="order-id">{order?.id}</span>
        </p>
      </div>

      {/* <!-- Order Tracking Content --> */}
      <div id="tracking-content" className="grid lg:grid-cols-3 gap-8">
        {/* <!-- Status Timeline --> */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            {/* <!-- Status Badge --> */}
            {order?.status !== "Delivered" ? (
              <div className="flex items-center justify-center mb-10">
                <div
                  id="status-badge"
                  className="flex items-center space-x-3 bg-orange-50 px-8 py-4 rounded-full"
                >
                  <Clock size={32} color="#f97316" strokeWidth={3} />
                  <span className="text-lg font-semibold">
                    Estimated: <span id="estimated-time">35</span> min
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center mb-10">
                <div
                  id="status-badge"
                  className="flex items-center space-x-3 bg-green-100 px-8 py-4 rounded-full"
                >
                  <CircleCheck size={32} color="#22c55e" strokeWidth={3} />
                  <span className="text-lg font-semibold ">Delivered!</span>
                </div>
              </div>
            )}

            {/* <!-- Timeline --> */}
            <div className="space-y-8">
              {/* <!-- Order Received --> */}
              <div
                className="flex items-start space-x-6 timeline-step"
                data-status="received"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      isActive("Order Received")
                        ? "bg-amber-600"
                        : "bg-gray-200"
                    } flex items-center justify-center text-white text-2xl shadow-lg`}
                  >
                    <CheckCircle size={32} color="#ffffff" strokeWidth={3} />
                  </div>
                  <div
                    className={`w-1 h-20 ${
                      isActive("Order Received")
                        ? "bg-amber-600"
                        : "bg-gray-200"
                    } mt-4`}
                  ></div>
                </div>
                <div className="flex-1 pt-3">
                  <h4
                    className={`text-xl font-semibold ${isActive("Order Received") ? "text-gray-900" : "text-gray-400"} mb-2`}
                  >
                    Order Received
                  </h4>
                  <p
                    className={`${isActive("Order Received") ? "text-gray-500" : "text-gray-400"}`}
                  >
                    We have received your order
                  </p>
                </div>
              </div>

              {/* <!-- Preparing --> */}
              <div
                className="flex items-start space-x-6 timeline-step"
                data-status="preparing"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isActive("Preparing") ? "bg-amber-600" : "bg-gray-200"
                    } text-2xl`}
                  >
                    <Utensils
                      size={32}
                      color={isActive("Preparing") ? "#ffffff" : "#9ca3af"}
                      strokeWidth={3}
                    />
                  </div>
                  <div
                    className={`w-1 h-20 ${
                      isActive("Preparing") ? "bg-amber-600" : "bg-gray-200"
                    } mt-4`}
                  ></div>
                </div>
                <div className="flex-1 pt-3">
                  <h4
                    className={`text-xl font-semibold ${isActive("Preparing") ? "text-gray-900" : "text-gray-400"} mb-2`}
                  >
                    Preparing
                  </h4>
                  <p
                    className={`${isActive("Preparing") ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Our chefs are preparing your food
                  </p>
                </div>
              </div>

              {/* <!-- Ready --> */}
              <div
                className="flex items-start space-x-6 timeline-step"
                data-status="ready"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${isActive("Ready") ? "bg-amber-600" : "bg-gray-200"} text-2xl`}
                  >
                    <Box
                      size={32}
                      color={isActive("Ready") ? "#ffffff" : "#9ca3af"}
                      strokeWidth={3}
                    />
                  </div>
                  <div
                    className={`w-1 h-20 ${
                      isActive("Ready") ? "bg-amber-600" : "bg-gray-200"
                    } mt-4`}
                  ></div>
                </div>
                <div className="flex-1 pt-3">
                  <h4
                    className={`text-xl font-semibold ${isActive("Ready") ? "text-gray-900" : "text-gray-400"} mb-2`}
                  >
                    Ready
                  </h4>
                  <p
                    className={`${isActive("Ready") ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Your order is ready for pickup
                  </p>
                </div>
              </div>

              {/* <!-- Out for Delivery --> */}
              <div
                className="flex items-start space-x-6 timeline-step"
                data-status="out-for-delivery"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${isActive("Out for Delivery") ? "bg-amber-600" : "bg-gray-200"} text-2xl`}
                  >
                    <TruckIcon
                      size={32}
                      color={
                        isActive("Out for Delivery") ? "#ffffff" : "#9ca3af"
                      }
                      strokeWidth={3}
                    />
                  </div>
                  <div
                    className={`w-1 h-20 ${
                      isActive("Out for Delivery")
                        ? "bg-amber-600"
                        : "bg-gray-200"
                    } mt-4`}
                  ></div>
                </div>
                <div className="flex-1 pt-3">
                  <h4
                    className={`text-xl font-semibold ${isActive("Out for Delivery") ? "text-gray-900" : "text-gray-400"} mb-2`}
                  >
                    Out for Delivery
                  </h4>
                  <p
                    className={`${isActive("Out for Delivery") ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Driver is on the way
                  </p>
                </div>
              </div>

              {/* <!-- Delivered --> */}
              <div
                className="flex items-start space-x-6 timeline-step"
                data-status="delivered"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${isActive("Delivered") ? "bg-amber-600" : "bg-gray-200"} text-2xl`}
                  >
                    <HomeIcon
                      size={32}
                      color={isActive("Delivered") ? "#ffffff" : "#9ca3af"}
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h4
                    className={`text-xl font-semibold ${isActive("Delivered") ? "text-gray-900" : "text-gray-400"} mb-2`}
                  >
                    Delivered
                  </h4>
                  <p
                    className={`${isActive("Delivered") ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Order has been delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Order Details Sidebar --> */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
            <h3 className="text-2xl font-display font-semibold">
              Order Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Delivery Address
                </p>
                <p className="text-gray-600" id="tracking-address">
                  {order?.customer.address}, {order?.customer.city} -{" "}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Contact
                </p>
                <p className="text-gray-600" id="tracking-contact">
                  {order?.customer.name} • {order?.customer.phone}
                </p>
              </div>
            </div>

            {/* <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Items</h4>
              <div id="tracking-items" className="space-y-3">
              </div>
            </div> */}

            {/* <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">
                  $<span id="tracking-total">{total}</span>
                </span>
              </div>
            </div> */}

            <button
              onClick={() => navigate("/")}
              className="w-full btn-primary text-white px-6 py-3 rounded-xl font-semibold"
            >
              Order Again
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Empty Tracking State --> */}
      <div id="empty-tracking" className="text-center py-20 hidden">
        <i className="fas fa-clock text-8xl text-gray-300 mb-6"></i>
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-3">
          No Active Orders
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Place an order to track its status here
        </p>
        <button
          onclick="showView('menu')"
          className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
}

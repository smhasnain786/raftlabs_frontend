import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cartContext";

import MenuPage from "./pages/MenuPage";
import CheckOutPage from "./pages/CheckOutPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import { NotificationProvider } from "./utilities/Notification";

export default function App() {
  return (
      <NotificationProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/track/:orderId" element={<TrackOrderPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
      </NotificationProvider>
  );
}

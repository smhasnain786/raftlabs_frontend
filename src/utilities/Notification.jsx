import { CircleCheck } from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  useEffect(() => {
  if (!notification) return;

  const timer = setTimeout(() => {
    setNotification("");
  }, 3000);

  return () => clearTimeout(timer);
}, [notification]);


  const showNotification = (message) => {
    setNotification(message);
  };

  const closeNotification = () => {
    setNotification("");
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && (
        <div className="fixed top-24 right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-3 slide-in">
          <CircleCheck size={32} color="#ffffff" strokeWidth={3} />
          <span className="font-semibold">{notification}</span>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

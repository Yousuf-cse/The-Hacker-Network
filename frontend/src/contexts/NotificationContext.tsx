import { createContext, useContext, useState, type ReactNode } from "react";

type Notification = {
  requestId: string;
  senderId: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (requestId: string, senderId: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return ctx;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (requestId: string, senderId: string) => {
    setNotifications((prev) => [...prev, { requestId, senderId }]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

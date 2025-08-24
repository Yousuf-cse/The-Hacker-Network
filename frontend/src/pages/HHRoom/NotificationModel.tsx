import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationContext";
import { acceptRequest } from "@/services/ApiServices";
import { X } from "lucide-react";
import { toast } from "sonner";

type NotificationModalProps = {
  setShowNotificationModal: (value: boolean) => void;
};

export default function NotificationModal({
  setShowNotificationModal,
}: NotificationModalProps) {
  const { notifications } = useNotifications();

  console.log(notifications);

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast.success("Request accepted");
    } catch (error) {
      toast.error("Failed to accept request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:items-start md:justify-end md:pt-20 md:pr-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden md:max-w-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-purple-50">
          <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotificationModal(false)}
            className="rounded-full hover:bg-white/80 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3">
            Mark All as Read
          </Button>
        </div>
      </div>
    </div>
  );
}

// <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
//   {notifications.length === 0 ? (
//     <p className="text-gray-500 text-center text-sm">
//       No new notifications
//     </p>
//   ) : (
//     notifications.map((notification) => (
//       <div
//         key={notification.id}
//         className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 flex flex-col gap-2"
//       >
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-800">
//               {notification.message}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               {notification.data?.time || ""}
//             </p>
//           </div>
//           <div
//             onClick={() => removeNotification(notification.id)}
//             className="ml-2 mt-1 w-2 h-2 rounded-full cursor-pointer"
//             style={{ backgroundColor: getDotColor(notification.type) }}
//           />
//         </div>

//         {notification.type === "match" && (
//           <Button
//             size="sm"
//             className="bg-green-600 hover:bg-green-700 text-white rounded-lg mt-2"
//             onClick={() =>
//               handleAccept(notification.data?.requestId || "")
//             }
//           >
//             Accept
//           </Button>
//         )}
//       </div>
//     ))
//   )}
// </div>;

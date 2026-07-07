import { Button } from "@/components/ui/button";
import { acceptRequest, cancelRequest, getConnectionRequests } from "@/services/ApiServices";
import { X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

type NotificationModalProps = {
  setShowNotificationModal: (value: boolean) => void;
};

export default function NotificationModal({
  setShowNotificationModal,
}: NotificationModalProps) {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("_id") || "";

  const fetchRequests = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getConnectionRequests(userId);
      const list = res.requests || (res as any).result || [];
      // Filter pending requests where the user is the receiver
      const pending = list.filter((r: any) => r.status === "Pending" && r.role === "receiver");
      setRequests(pending);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userId]);

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast.success("Match request accepted!");
      fetchRequests();
      // Reload page to reflect newly created rooms
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to accept request");
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await cancelRequest(requestId);
      toast.success("Match request declined");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to decline request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:items-start md:justify-end md:pt-20 md:pr-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden md:max-w-sm border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
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

        {/* Body (Requests) */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[50vh]">
          {loading ? (
            <p className="text-gray-500 text-center text-sm font-inter">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500 text-center text-sm font-inter">No pending match requests</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-200 flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {req.from.avatar ? (
                      <img src={req.from.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      req.from.full_name[0].toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate font-inter">
                      {req.from.full_name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate font-inter">
                      wants to match for Hacker House
                    </p>
                    {req.from.skills?.technical && (
                      <p className="text-xs text-blue-600 font-semibold mt-1 truncate font-inter text-left">
                        Skills: {req.from.skills.technical}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecline(req._id)}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-8 text-xs rounded-lg flex items-center gap-1 font-inter"
                  >
                    <X className="w-3.5 h-3.5" />
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAccept(req._id)}
                    className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs rounded-lg flex items-center gap-1 font-inter"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Accept
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3"
            onClick={() => setShowNotificationModal(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

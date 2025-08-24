import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { createRequest, findSimilarProfiles } from "@/services/ApiServices";

type User = {
  _id: string;
  full_name: string;
  age: number;
  avatar?: string;
  email: string;
  phone_number: string;
  address: {
    lat?: number;
    lon?: number;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    landmark?: string;
  };
  education?: { college_name?: string };
  skills?: { technical?: string; non_technical?: string };
  experience_level: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function Hero() {
  const [currentCard, setCurrentCard] = useState(0);
  const [profiles, setProfiles] = useState<(User & { near: number })[]>([]);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleMatch = async (id: string) => {
    if (sentRequests.includes(id)) return;
    try {
      setLoadingId(id);
      await createRequest({
        from_user_objectId: Cookies.get("_id") as string,
        to_user_objectId: id,
      });
      setSentRequests((prev) => [...prev, id]);
      toast.success("Match request sent");
    } catch {
      toast.error("Failed to send match request");
    } finally {
      setLoadingId(null);
    }
  };

  const fetchSimilarUsers = async () => {
    try {
      // Server returns an array of users
      const res = await findSimilarProfiles(Cookies.get("_id") as string);

      // Be defensive in case older code still wraps in { result }
      const arr: User[] = Array.isArray(res)
        ? res
        : Array.isArray((res as any)?.result)
        ? (res as any).result
        : [];

      // Ensure each item has a 'near' value so UI doesn't break
      const normalized = arr.map((u: any) => ({
        ...u,
        near:
          typeof u?.near === "number" && Number.isFinite(u.near)
            ? u.near
            : Infinity,
      }));

      setProfiles(normalized);
    } catch {
      toast.error("Error while loading similar users");
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilarUsers();
  }, []);

  const nextCard = () => {
    if (profiles.length > 0) {
      setCurrentCard((prev) => (prev + 1) % profiles.length);
    }
  };

  const prevCard = () => {
    if (profiles.length > 0) {
      setCurrentCard((prev) => (prev - 1 + profiles.length) % profiles.length);
    }
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextCard();
    if (distance < -minSwipeDistance) prevCard();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-gray-600 text-lg">Loading similar profiles...</p>
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-gray-600 text-lg">No similar profiles found.</p>
      </div>
    );
  }

  const profile = profiles[currentCard];
  const isSent = sentRequests.includes(profile._id);
  const isLoading = loadingId === profile._id;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="font-main-heading text-4xl md:text-6xl lg:text-7xl font-bold text-blue-600 mb-8">
          Welcome Back Hacker
        </h1>
        <p className="font-lightItalic text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-2 leading-relaxed">
          Find like-minded students to form your hacker house
        </p>
      </div>

      <div className="relative w-full max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center">
          <button
            onClick={prevCard}
            className="absolute left-4 z-10 p-3"
            aria-label="Previous profile"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <div
            className="bg-white overflow-hidden w-80 mx-8 rounded-xl shadow-lg"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative border border-gray-200">
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-2 left-2 bg-white/80 text-blue-500 px-3 py-1 rounded text-sm font-medium">
                {profile.education?.college_name}
              </div>
              <div className="absolute top-2 right-2 bg-green-500/80 text-white px-3 py-1 rounded text-sm font-semibold">
                {profile.near === Infinity ? "Unknown" : `${profile.near} km`}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="font-inter text-xl font-semibold text-white mb-1">
                  {profile.full_name}, {profile.age}
                </h3>
                <p className="font-montserrat text-gray-200 text-sm">
                  {profile.skills?.technical}
                </p>
                <p className="font-montserrat text-gray-300 text-xs">
                  {profile.skills?.non_technical}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={nextCard}
            className="absolute right-4 z-10 p-3"
            aria-label="Next profile"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      <button
        onClick={() => handleMatch(profile._id)}
        disabled={isSent || isLoading}
        className={`font-inter text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform shadow-lg ${
          isSent
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
        }`}
      >
        {isLoading ? "Sending..." : isSent ? "Request Sent" : "Match"}
      </button>
    </div>
  );
}

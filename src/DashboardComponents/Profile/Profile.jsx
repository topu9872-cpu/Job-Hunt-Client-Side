"use client";

import ProfileComponent from "@/DashboardComponents/Profile/ProfileWithEditModal";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const Profile = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="mx-auto flex justify-center pt-20 items-center">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5 font-sans transition-colors duration-300 dark:bg-neutral-950">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
      {!user && <div>don`t have profile</div>}
      <div className="animate-fade-in-up w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg opacity-0 transition-colors duration-300 dark:bg-black dark:border dark:border-neutral-800 dark:shadow-none">
        <div className="mb-5">
          <Image
            src={user?.image}
            width={200}
            height={200}
            alt={user?.name}
            className="mx-auto h-28 w-28 rounded-full border-4 border-gray-200 object-cover dark:border-neutral-800"
          />
        </div>

        {/* Info Section */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 dark:text-neutral-50">
            {user?.name}
          </h2>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1 dark:text-neutral-400">
            <FaBriefcase className="text-gray-400 dark:text-neutral-500" />
            <span>{user?.role}</span>
          </div>

          {user?.location && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-neutral-400">
              <FaMapMarkerAlt className="text-gray-400 dark:text-neutral-500" />
              <span>{user?.location}</span>
            </div>
          )}

          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
            {user?.bio}
          </p>
        </div>

        <ProfileComponent user={user}/>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import {
  Bell,
  Home,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
} from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t md:relative md:border-t-0 md:border-r md:w-64 md:h-screen">
      <div className="flex justify-around md:flex-col md:justify-start md:p-4">
        <NavItem icon={<Home />} label="Home" active />
        <NavItem icon={<MessageSquare />} label="Forums" />
        <NavItem icon={<Calendar />} label="Events" />
        <NavItem icon={<Briefcase />} label="Jobs" />
        <NavItem icon={<Users />} label="Mentorship" />
        <NavItem icon={<Bell />} label="Notifications" notificationCount={3} />
      </div>
    </nav>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  notificationCount,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notificationCount?: number;
}) => {
  return (
    <div
      className={`relative flex items-center p-3 my-1 rounded-lg cursor-pointer 
      ${active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-black"}
      md:w-full`}
    >
      <span className="md:mr-3">{icon}</span>
      <span className="hidden md:block">{label}</span>
      {notificationCount && (
        <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default Navigation;

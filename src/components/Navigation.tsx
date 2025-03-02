import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Home,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
} from "lucide-react";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <nav className="fixed bottom-0 w-full top-16 bg-white border-t md:border-t-0 md:border-r md:w-64 md:h-screen">
      <div className="flex justify-around md:flex-col md:justify-start md:p-4">
        <NavItem
          icon={<Home />}
          label="Home"
          active={activeTab === "Home"}
          onClick={() => setActiveTab("Home")}
        />
        <NavItem
          icon={<MessageSquare />}
          label="Forums"
          active={activeTab === "Forums"}
          onClick={() => setActiveTab("Forums")}
          route="/community"
          target="_blank"
        />
        <NavItem
          icon={<Calendar />}
          label="Events"
          active={activeTab === "Events"}
          onClick={() => setActiveTab("Events")}
        />
        <NavItem
          icon={<Briefcase />}
          label="Jobs"
          active={activeTab === "Jobs"}
          onClick={() => setActiveTab("Jobs")}
          route="/jobs"
        />
        <NavItem
          icon={<Users />}
          label="Mentorship"
          active={activeTab === "Mentorship"}
          onClick={() => setActiveTab("Mentorship")}
        />
        <NavItem
          icon={<Bell />}
          label="Notifications"
          notificationCount={3}
          active={activeTab === "Notifications"}
          onClick={() => setActiveTab("Notifications")}
        />
      </div>
    </nav>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  notificationCount,
  route,
  target = "",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notificationCount?: number;
  route?: string;
  target?: string;
  onClick?: () => void;
}) => {
  return (
    <Link to={route || "/"} target={target} onClick={onClick}>
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
    </Link>
  );
};

export default Navigation;

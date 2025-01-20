import { Calendar, Users, Briefcase, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Upcoming Events",
      value: "12",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Active Mentorships",
      value: "45",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      label: "Job Opportunities",
      value: "28",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Network Growth",
      value: "+15%",
    },
  ];

  return (
    <div className="p- bg-yellow-200">
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                {stat.icon}
              </div>
              <span className="text-2xl font-semibold">{stat.value}</span>
            </div>
            <h3 className="text-gray-600">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingEvents />
        <RecentDiscussions />
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const events = [
    {
      title: "Tech Industry Networking",
      date: "Mar 15, 2024",
      type: "networking",
      attendees: 45,
    },
    {
      title: "Career Development Workshop",
      date: "Mar 18, 2024",
      type: "workshop",
      attendees: 30,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 mr-4 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {event.date} • {event.attendees} attending
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentDiscussions = () => {
  const discussions = [
    {
      title: "Tips for Breaking into Tech",
      author: "Sarah Chen",
      replies: 23,
      timestamp: "2h ago",
    },
    {
      title: "Alumni Mentorship Program Q&A",
      author: "Michael Rodriguez",
      replies: 15,
      timestamp: "4h ago",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Recent Discussions</h2>
      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-medium">{discussion.title}</h3>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <span>{discussion.author}</span>
              <span className="mx-2">•</span>
              <span>{discussion.replies} replies</span>
              <span className="mx-2">•</span>
              <span>{discussion.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

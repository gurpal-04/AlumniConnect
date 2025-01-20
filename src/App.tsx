import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 z-10 w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&h=100"
              alt="University Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-semibold">Alumni Connect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </header>

      <div className="flex pt-16 w-full">
        <Navigation />
        <main className="flex-1 bg-red-200">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;

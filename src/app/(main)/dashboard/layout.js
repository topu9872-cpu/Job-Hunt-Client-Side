import SideBar from "@/DashboardComponents/SideBar/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 mt-16 md:mt-10 p-4 md:p-6 flex justify-center md:justify-end">
        
        {/* Content Wrapper */}
        <div className="w-full max-w-5xl">
          {children}
        </div>

      </main>
    </div>
  );
};

export default DashboardLayout;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Users, BookOpen, DollarSign, LogOut, Home, Key } from "lucide-react";
import SchoolLicenseManager from "./SchoolLicenseManager";

const AdminControlCenter = ({ onExit }: { onExit: () => void }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { label: "Total Students", value: "5,234", icon: Users },
    { label: "Active Courses", value: "42", icon: BookOpen },
    { label: "Revenue (Month)", value: "$12,450", icon: DollarSign },
    { label: "Teachers", value: "18", icon: Settings },
  ];

  const adminTabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "licensing", label: "School Licensing", icon: Key },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "courses", label: "Manage Courses", icon: BookOpen },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border/50 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">GIS Learn ZW — Control Center</h1>
          <Button variant="ghost" size="sm" onClick={onExit} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Exit Admin
          </Button>
        </div>
      </div>

      <div className="flex pt-20">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border/50 fixed h-screen pt-4">
          <nav className="space-y-2 px-4">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                      </div>
                      <stat.icon className="h-12 w-12 text-accent opacity-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "licensing" && (
            <SchoolLicenseManager />
          )}

          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Manage Users</h2>
                <Button>Add New User</Button>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Role</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-3">John Doe</td>
                      <td className="px-6 py-3">john@example.com</td>
                      <td className="px-6 py-3"><span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">Teacher</span></td>
                      <td className="px-6 py-3"><span className="bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-sm">Active</span></td>
                      <td className="px-6 py-3"><Button size="sm" variant="ghost">Edit</Button></td>
                    </tr>
                    <tr className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-3">Jane Smith</td>
                      <td className="px-6 py-3">jane@example.com</td>
                      <td className="px-6 py-3"><span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Student</span></td>
                      <td className="px-6 py-3"><span className="bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-sm">Active</span></td>
                      <td className="px-6 py-3"><Button size="sm" variant="ghost">Edit</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Manage Courses</h2>
                <Button>Create New Course</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {["GIS Fundamentals", "Remote Sensing Basics", "Map Analysis", "Spatial Data"].map((course) => (
                  <div key={course} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-3">{course}</h3>
                    <p className="text-muted-foreground text-sm mb-4">24 lessons • 1,250 students enrolled</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Billing & Revenue</h2>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-muted-foreground mb-2">Monthly Revenue</p>
                    <p className="text-4xl font-bold text-primary">$12,450</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">YTD Revenue</p>
                    <p className="text-4xl font-bold text-accent">$156,230</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">Active Subscriptions</p>
                    <p className="text-4xl font-bold text-primary">324</p>
                  </div>
                </div>
                <Button>Download Revenue Report</Button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Website Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-card border border-border rounded-lg p-6">
                  <label className="block text-sm font-semibold mb-2">Site Title</label>
                  <input type="text" defaultValue="GIS Learn ZW" className="w-full px-3 py-2 border border-border rounded-lg bg-background" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <label className="block text-sm font-semibold mb-2">Contact Email</label>
                  <input type="email" defaultValue="support@gislearnzw.com" className="w-full px-3 py-2 border border-border rounded-lg bg-background" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <label className="block text-sm font-semibold mb-2">Maintenance Mode</label>
                  <div className="flex items-center gap-2 mt-3">
                    <input type="checkbox" id="maintenance" className="rounded" />
                    <label htmlFor="maintenance" className="text-sm">Enable maintenance mode</label>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminControlCenter;

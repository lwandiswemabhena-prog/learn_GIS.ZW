import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, XCircle, Clock, Key } from "lucide-react";

interface SchoolLicense {
  id: string;
  schoolName: string;
  email: string;
  tier: "Basic" | "Standard" | "Premium";
  status: "pending" | "approved" | "rejected" | "expired";
  licenseCode: string;
  activationDate: string;
  expirationDate: string;
  students: number;
  teachers: number;
  notes: string;
}

interface SchoolLicenseManagerProps {
  onClose?: () => void;
}

const SchoolLicenseManager = ({ onClose }: SchoolLicenseManagerProps) => {
  const [licenses, setLicenses] = useState<SchoolLicense[]>([
    {
      id: "1",
      schoolName: "Harare High School",
      email: "harare@school.zw",
      tier: "Standard",
      status: "approved",
      licenseCode: "GES-2026-001-STD",
      activationDate: "2026-01-15",
      expirationDate: "2026-12-31",
      students: 450,
      teachers: 25,
      notes: "Government school",
    },
    {
      id: "2",
      schoolName: "Bulawayo Academy",
      email: "bulawayo@academy.zw",
      tier: "Premium",
      status: "approved",
      licenseCode: "GES-2026-002-PREM",
      activationDate: "2026-02-01",
      expirationDate: "2027-01-31",
      students: 800,
      teachers: 45,
      notes: "Private institution",
    },
    {
      id: "3",
      schoolName: "Mutare Secondary",
      email: "mutare@secondary.zw",
      tier: "Basic",
      status: "pending",
      licenseCode: "GES-2026-003-BAS",
      activationDate: "-",
      expirationDate: "-",
      students: 200,
      teachers: 12,
      notes: "Awaiting approval",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<SchoolLicense | null>(null);
  const [newSchool, setNewSchool] = useState({
    schoolName: "",
    email: "",
    students: 100,
    teachers: 5,
    tier: "Basic",
    notes: "",
  });

  const generateLicenseCode = () => {
    const tier = newSchool.tier === "Basic" ? "BAS" : newSchool.tier === "Standard" ? "STD" : "PREM";
    const num = licenses.length + 1;
    return `GES-2026-${String(num).padStart(3, "0")}-${tier}`;
  };

  const handleSubmitSchool = () => {
    if (!newSchool.schoolName || !newSchool.email) {
      alert("Please fill in all required fields");
      return;
    }

    const license: SchoolLicense = {
      id: Date.now().toString(),
      schoolName: newSchool.schoolName,
      email: newSchool.email,
      tier: newSchool.tier as any,
      status: "pending",
      licenseCode: generateLicenseCode(),
      activationDate: "-",
      expirationDate: "-",
      students: newSchool.students,
      teachers: newSchool.teachers,
      notes: newSchool.notes,
    };

    setLicenses([...licenses, license]);
    setNewSchool({ schoolName: "", email: "", students: 100, teachers: 5, tier: "Basic", notes: "" });
    setShowForm(false);
    alert(`✅ License request received for ${newSchool.schoolName}`);
  };

  const approveLicense = (id: string) => {
    const today = new Date();
    const expiry = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate())
      .toISOString()
      .split("T")[0];

    setLicenses(
      licenses.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "approved",
              activationDate: today.toISOString().split("T")[0],
              expirationDate: expiry,
            }
          : l
      )
    );
    alert("✅ License approved and activated!");
  };

  const rejectLicense = (id: string) => {
    setLicenses(
      licenses.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "rejected",
            }
          : l
      )
    );
    alert("❌ License request rejected");
  };

  const renewLicense = (id: string) => {
    const today = new Date();
    const expiry = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
      .toISOString()
      .split("T")[0];

    setLicenses(
      licenses.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "approved",
              expirationDate: expiry,
            }
          : l
      )
    );
    alert("🔄 License renewed!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-600 border-green-500/50";
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/50";
      case "rejected":
        return "bg-red-500/20 text-red-600 border-red-500/50";
      case "expired":
        return "bg-gray-500/20 text-gray-600 border-gray-500/50";
      default:
        return "bg-blue-500/20 text-blue-600 border-blue-500/50";
    }
  };

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case "Basic":
        return "$50";
      case "Standard":
        return "$100";
      case "Premium":
        return "$200";
      default:
        return "-";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Key className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">School Licensing & Authorization</h2>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          {showForm ? "Cancel" : "Authenticate New School"}
        </Button>
      </div>

      {/* Registration Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/30 rounded-lg p-6">
          <h3 className="font-bold mb-4">Register School & Issue License</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">School Name *</label>
              <input
                type="text"
                placeholder="Enter school name"
                value={newSchool.schoolName}
                onChange={(e) => setNewSchool({ ...newSchool, schoolName: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Email Address *</label>
              <input
                type="email"
                placeholder="contact@school.com"
                value={newSchool.email}
                onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">License Tier</label>
              <select
                value={newSchool.tier}
                onChange={(e) => setNewSchool({ ...newSchool, tier: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option>Basic</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Annual Cost</label>
              <input
                type="text"
                disabled
                value={getTierPrice(newSchool.tier)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background opacity-75"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Students</label>
              <input
                type="number"
                value={newSchool.students}
                onChange={(e) => setNewSchool({ ...newSchool, students: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Teachers</label>
              <input
                type="number"
                value={newSchool.teachers}
                onChange={(e) => setNewSchool({ ...newSchool, teachers: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold mb-1 block">Notes</label>
              <textarea
                placeholder="Additional information..."
                value={newSchool.notes}
                onChange={(e) => setNewSchool({ ...newSchool, notes: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                rows={2}
              />
            </div>
          </div>
          <Button onClick={handleSubmitSchool} className="w-full">
            Generate & Register License
          </Button>
        </div>
      )}

      {/* License Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Licenses",
            value: licenses.length,
            color: "bg-primary",
          },
          {
            label: "Active",
            value: licenses.filter((l) => l.status === "approved").length,
            color: "bg-green-500",
          },
          {
            label: "Pending Approval",
            value: licenses.filter((l) => l.status === "pending").length,
            color: "bg-yellow-500",
          },
          {
            label: "Expired",
            value: licenses.filter((l) => l.status === "expired").length,
            color: "bg-destructive",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color.replace("bg-", "text-")}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Licenses Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">School</th>
                <th className="px-4 py-3 text-left font-semibold">Tier</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">License Code</th>
                <th className="px-4 py-3 text-left font-semibold">Students</th>
                <th className="px-4 py-3 text-left font-semibold">Expiry</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {licenses.map((license) => (
                <tr
                  key={license.id}
                  className="hover:bg-background/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedLicense(license)}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold">{license.schoolName}</p>
                      <p className="text-xs text-muted-foreground">{license.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">
                      {license.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(license.status)}`}>
                      {license.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{license.licenseCode}</td>
                  <td className="px-4 py-3">{license.students}</td>
                  <td className="px-4 py-3 text-xs">
                    {license.expirationDate === "-" ? "-" : new Date(license.expirationDate) < new Date() ? "EXPIRED" : license.expirationDate}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {license.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-500/50 hover:bg-green-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              approveLicense(license.id);
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive border-destructive/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              rejectLicense(license.id);
                            }}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {license.status === "approved" && new Date(license.expirationDate) < new Date() && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-accent border-accent/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            renewLicense(license.id);
                          }}
                        >
                          <Zap className="h-4 w-4" />
                        </Button>
                      )}
                      {license.status === "approved" && new Date(license.expirationDate) > new Date() && (
                        <div className="text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Active</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* License Details Modal */}
      {selectedLicense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full p-8 space-y-4">
            <h3 className="text-2xl font-bold">{selectedLicense.schoolName}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="font-semibold">{selectedLicense.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">License Tier</p>
                <p className="font-semibold">{selectedLicense.tier}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <p className={`font-semibold ${selectedLicense.status === "approved" ? "text-green-600" : "text-yellow-600"}`}>
                  {selectedLicense.status.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">License Code</p>
                <p className="font-mono">{selectedLicense.licenseCode}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Students</p>
                <p className="font-semibold">{selectedLicense.students}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Teachers</p>
                <p className="font-semibold">{selectedLicense.teachers}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Activation Date</p>
                <p className="font-semibold">{selectedLicense.activationDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Expiration Date</p>
                <p className="font-semibold">{selectedLicense.expirationDate}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground text-sm">Notes</p>
                <p className="font-semibold">{selectedLicense.notes || "-"}</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setSelectedLicense(null)}>
                Close
              </Button>
              {selectedLicense.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    className="text-green-600"
                    onClick={() => {
                      approveLicense(selectedLicense.id);
                      setSelectedLicense(null);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      rejectLicense(selectedLicense.id);
                      setSelectedLicense(null);
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolLicenseManager;

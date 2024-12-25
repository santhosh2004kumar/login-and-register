// import { useEffect, useState } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import { UserDetailsApi } from "../services/Api";
// import { logout, isAuthenticated } from "../services/auth";
// import NavBar from "../components/NavBar";

// export default function DashBoardPage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     localId: "",
//     profilePicture: "",
//     phoneNumber: "",
//     lastLogin: "",
//     accountCreated: "",
//     role: "User",
//     status: "Active",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("profile");

//   useEffect(() => {
//     if (isAuthenticated()) {
//       setLoading(true);
//       UserDetailsApi().then((response) => {
//         const userData = response.data.users[0];
//         setUser({
//           name: userData.displayName || "Not provided",
//           email: userData.email,
//           localId: userData.localId,
//           profilePicture:
//             userData.photoUrl || "https://via.placeholder.com/150",
//           phoneNumber: userData.phoneNumber || "Not provided",
//           lastLogin: new Date().toLocaleDateString(),
//           accountCreated: new Date().toLocaleDateString(),
//           role: "Standard User",
//           status: "Active",
//         });
//         setLoading(false);
//       });
//     }
//   }, []);

//   const logoutUser = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleEditProfile = () => {
//     setIsEditing(!isEditing);
//   };

//   const renderProfileSection = () => (
//     <div className="card shadow-sm">
//       <div className="card-header bg-white border-0">
//         <div className="row align-items-center">
//           <div className="col">
//             <h3 className="mb-0">Profile Information</h3>
//           </div>
//           <div className="col text-end">
//             <button
//               className={`btn ${
//                 isEditing ? "btn-success" : "btn-primary"
//               } btn-sm`}
//               onClick={handleEditProfile}
//             >
//               {isEditing ? "Save Changes" : "Edit Profile"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="card-body">
//         <div className="row">
//           <div className="col-lg-3 text-center">
//             <div className="position-relative">
//               <img
//                 src={user.profilePicture}
//                 alt="Profile"
//                 className="rounded-circle img-fluid mb-3 shadow-sm"
//                 style={{ width: "150px", height: "150px", objectFit: "cover" }}
//               />
//               {isEditing && (
//                 <button className="btn btn-sm btn-primary position-absolute bottom-0 start-50 translate-middle-x">
//                   Change Photo
//                 </button>
//               )}
//             </div>
//             <div className="badge bg-success mb-2">Status: {user.status}</div>
//             <div className="badge bg-info">Role: {user.role}</div>
//           </div>
//           <div className="col-lg-9">
//             <form>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={user.name}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={user.email}
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={user.phoneNumber}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">User ID</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={user.localId}
//                     disabled
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderAccountSection = () => (
//     <div className="row">
//       <div className="col-md-6 mb-4">
//         <div className="card shadow-sm h-100">
//           <div className="card-header bg-white">
//             <h5 className="mb-0">Account Statistics</h5>
//           </div>
//           <div className="card-body">
//             <div className="d-flex justify-content-between mb-3">
//               <span>Account Created:</span>
//               <span className="text-muted">{user.accountCreated}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-3">
//               <span>Last Login:</span>
//               <span className="text-muted">{user.lastLogin}</span>
//             </div>
//             <div className="d-flex justify-content-between">
//               <span>Account Status:</span>
//               <span className="badge bg-success">{user.status}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-6 mb-4">
//         <div className="card shadow-sm h-100">
//           <div className="card-header bg-white">
//             <h5 className="mb-0">Security Settings</h5>
//           </div>
//           <div className="card-body">
//             <div className="mb-3">
//               <div className="form-check form-switch">
//                 <input className="form-check-input" type="checkbox" id="2fa" />
//                 <label className="form-check-label" htmlFor="2fa">
//                   Two-Factor Authentication
//                 </label>
//               </div>
//             </div>
//             <div className="mb-3">
//               <div className="form-check form-switch">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="notifications"
//                   defaultChecked
//                 />
//                 <label className="form-check-label" htmlFor="notifications">
//                   Email Notifications
//                 </label>
//               </div>
//             </div>
//             <button className="btn btn-outline-primary btn-sm">
//               Change Password
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (!isAuthenticated()) {
//     return <Navigate to="/login" />;
//   }

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100">
//       <NavBar logoutUser={logoutUser} />
//       <main className="container py-5">
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h1 className="h3 mb-0">Welcome back, {user.name}!</h1>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row mb-4">
//           <div className="col-12">
//             <ul className="nav nav-tabs">
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${
//                     activeTab === "profile" ? "active" : ""
//                   }`}
//                   onClick={() => setActiveTab("profile")}
//                 >
//                   Profile
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${
//                     activeTab === "account" ? "active" : ""
//                   }`}
//                   onClick={() => setActiveTab("account")}
//                 >
//                   Account Settings
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {activeTab === "profile"
//           ? renderProfileSection()
//           : renderAccountSection()}
//       </main>
//     </div>
//   );
// }

//dark theme
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserDetailsApi } from "../services/Api";
import { logout, isAuthenticated } from "../services/auth";
import NavBar from "../components/NavBar";
import {
  User,
  Settings,
  Bell,
  Shield,
  Calendar,
  Activity,
  Clock,
  Camera,
  Edit2,
  Save,
  LogOut,
  Chart,
  Mail,
  Phone,
  Key,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function DashBoardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    localId: "",
    profilePicture: "",
    phoneNumber: "",
    lastLogin: "",
    accountCreated: "",
    role: "User",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    if (isAuthenticated()) {
      setLoading(true);
      UserDetailsApi().then((response) => {
        const userData = response.data.users[0];
        setUser({
          name: userData.displayName || "Not provided",
          email: userData.email,
          localId: userData.localId,
          profilePicture:
            userData.photoUrl || "https://via.placeholder.com/150",
          phoneNumber: userData.phoneNumber || "Not provided",
          lastLogin: new Date().toLocaleDateString(),
          accountCreated: new Date().toLocaleDateString(),
          role: "Standard User",
          status: "Active",
        });
        setLoading(false);
      });
    }
  }, []);

  const logoutUser = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 1000);
  };

  const handleEditProfile = () => {
    if (isEditing) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
    setIsEditing(!isEditing);
  };

  const renderProfileSection = () => (
    <div
      className={`card shadow-lg border-0 rounded-lg hover-card ${
        animate ? "fade-in-up" : ""
      }`}
    >
      <div className="card-header bg-white border-0 p-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <User size={24} className="text-primary me-2" />
              <h3 className="mb-0">Profile Information</h3>
            </div>
          </div>
          <div className="col text-end">
            <button
              className={`btn ${
                isEditing ? "btn-success" : "btn-primary"
              } btn-lg d-flex align-items-center gap-2`}
              onClick={handleEditProfile}
            >
              {isEditing ? (
                <>
                  <Save size={18} /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={18} /> Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="row">
          <div className="col-lg-3 text-center">
            <div className="position-relative profile-image-container mb-4">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded-circle img-fluid shadow profile-image"
              />
              {isEditing && (
                <button className="btn btn-primary btn-sm position-absolute bottom-0 start-50 translate-middle-x d-flex align-items-center gap-2">
                  <Camera size={16} /> Change Photo
                </button>
              )}
            </div>
            <div className="status-badges">
              <div className="badge bg-success mb-2 p-2">
                <div className="d-flex align-items-center gap-2">
                  <CheckCircle2 size={14} />
                  Status: {user.status}
                </div>
              </div>
              <div className="badge bg-primary p-2">
                <div className="d-flex align-items-center gap-2">
                  <Shield size={14} />
                  Role: {user.role}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <form className="profile-form">
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={user.name}
                      disabled={!isEditing}
                      placeholder="Full Name"
                    />
                    <label>Full Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={user.email}
                      disabled
                      placeholder="Email"
                    />
                    <label>Email</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      value={user.phoneNumber}
                      disabled={!isEditing}
                      placeholder="Phone Number"
                    />
                    <label>Phone Number</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={user.localId}
                      disabled
                      placeholder="User ID"
                    />
                    <label>User ID</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className={`row ${animate ? "fade-in-up" : ""}`}>
      <div className="col-md-6 mb-4">
        <div className="card shadow-lg border-0 rounded-lg hover-card h-100">
          <div className="card-header bg-white p-4">
            <div className="d-flex align-items-center">
              <Activity size={24} className="text-primary me-2" />
              <h5 className="mb-0">Account Statistics</h5>
            </div>
          </div>
          <div className="card-body p-4">
            <div className="stat-item mb-4">
              <div className="d-flex align-items-center mb-2">
                <Calendar size={18} className="text-muted me-2" />
                <span className="text-muted">Account Created</span>
              </div>
              <h6 className="mb-0">{user.accountCreated}</h6>
            </div>
            <div className="stat-item mb-4">
              <div className="d-flex align-items-center mb-2">
                <Clock size={18} className="text-muted me-2" />
                <span className="text-muted">Last Login</span>
              </div>
              <h6 className="mb-0">{user.lastLogin}</h6>
            </div>
            <div className="stat-item">
              <div className="d-flex align-items-center mb-2">
                <Shield size={18} className="text-muted me-2" />
                <span className="text-muted">Account Status</span>
              </div>
              <div className="badge bg-success p-2">
                <CheckCircle2 size={14} className="me-1" />
                {user.status}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card shadow-lg border-0 rounded-lg hover-card h-100">
          <div className="card-header bg-white p-4">
            <div className="d-flex align-items-center">
              <Key size={24} className="text-primary me-2" />
              <h5 className="mb-0">Security Settings</h5>
            </div>
          </div>
          <div className="card-body p-4">
            <div className="security-option mb-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="2fa" />
                <label
                  className="form-check-label d-flex align-items-center gap-2"
                  htmlFor="2fa"
                >
                  <Shield size={18} className="text-muted" />
                  Two-Factor Authentication
                </label>
              </div>
            </div>
            <div className="security-option mb-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notifications"
                  defaultChecked
                />
                <label
                  className="form-check-label d-flex align-items-center gap-2"
                  htmlFor="notifications"
                >
                  <Bell size={18} className="text-muted" />
                  Email Notifications
                </label>
              </div>
            </div>
            <button className="btn btn-outline-primary btn-lg d-flex align-items-center gap-2">
              <Key size={18} />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient min-vh-100">
      <NavBar logoutUser={logoutUser} />

      {showSuccessToast && (
        <div className="toast-container position-fixed top-0 end-0 p-3">
          <div className="toast show bg-success text-white" role="alert">
            <div className="toast-body d-flex align-items-center">
              <CheckCircle2 size={18} className="me-2" />
              Profile updated successfully!
            </div>
          </div>
        </div>
      )}

      <main className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <div
              className={`card shadow-lg border-0 rounded-lg welcome-card ${
                animate ? "fade-in-up" : ""
              }`}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="welcome-icon me-4">
                    <User size={32} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="h3 mb-1">Welcome back, {user.name}!</h1>
                    <p className="text-muted mb-0">
                      Manage your account and settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <ul className="nav nav-pills nav-fill gap-2">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "profile" ? "active" : ""
                  } d-flex align-items-center justify-content-center gap-2`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User size={18} />
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "account" ? "active" : ""
                  } d-flex align-items-center justify-content-center gap-2`}
                  onClick={() => setActiveTab("account")}
                >
                  <Settings size={18} />
                  Account Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {activeTab === "profile"
          ? renderProfileSection()
          : renderAccountSection()}
      </main>

      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          background-size: 200% 200%;
          animation: gradientAnimation 15s ease infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .loading-screen {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .welcome-card {
          transition: all 0.3s ease;
        }

        .welcome-icon {
          width: 64px;
          height: 64px;
          background: rgba(13, 110, 253, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hover-card {
          transition: all 0.3s ease;
        }

        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
        }

        .profile-image-container {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
        }

        .status-badges .badge {
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
        }

        .nav-pills .nav-link {
          padding: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-pills .nav-link:hover {
          transform: translateY(-2px);
        }

        .stat-item {
          padding: 1rem;
          border-radius: 0.5rem;
          background: rgba(13, 110, 253, 0.05);
          margin-bottom: 1rem;
        }

        .security-option {
          padding: 1rem;
          border-radius: 0.5rem;
          background: rgba(13, 110, 253, 0.05);
          transition: all 0.3s ease;
        }

        .security-option:hover {
          background: rgba(13, 110, 253, 0.1);
        }

        .form-check-input {
          width: 3rem;
          height: 1.5rem;
          cursor: pointer;
        }

        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: #0d6efd;
        }

        .form-control:disabled {
          background-color: #f8f9fa;
          cursor: not-allowed;
        }

        .toast {
          animation: slideInRight 0.3s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .card {
            margin: 10px;
          }

          .welcome-icon {
            width: 48px;
            height: 48px;
          }

          .profile-image-container {
            width: 120px;
            height: 120px;
          }

          .nav-pills .nav-link {
            padding: 0.75rem;
            font-size: 0.9rem;
          }

          .btn-lg {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .card-header {
            padding: 1rem;
          }

          .card-body {
            padding: 1rem;
          }

          .status-badges .badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .bg-gradient {
            background: linear-gradient(135deg, #1a1c23 0%, #2d3748 100%);
          }

          .card {
            background-color: #2d3748;
            color: #fff;
          }

          .card-header {
            background-color: #2d3748 !important;
            border-bottom: 1px solid #4a5568;
          }

          .form-control {
            background-color: #4a5568;
            border-color: #4a5568;
            color: #fff;
          }

          .form-control:disabled {
            background-color: #2d3748;
          }

          .text-muted {
            color: #a0aec0 !important;
          }

          .nav-pills .nav-link {
            color: #fff;
          }

          .nav-pills .nav-link:not(.active) {
            background-color: #4a5568;
          }

          .stat-item,
          .security-option {
            background: rgba(255, 255, 255, 0.05);
          }

          .security-option:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        /* Hover effects for buttons */
        .btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
        }

        .btn:active::after {
          width: 200%;
          height: 200%;
        }

        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, color 0.3s ease,
            border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// //with light theme

// import { useState, useEffect } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import { UserDetailsApi } from "../services/Api";
// import { logout, isAuthenticated } from "../services/auth";
// import NavBar from "../components/NavBar";
// import {
//   User,
//   Settings,
//   Bell,
//   Shield,
//   Calendar,
//   Activity,
//   Clock,
//   Camera,
//   Edit2,
//   Save,
//   LogOut,
//   CheckCircle2,
//   Key,
// } from "lucide-react";

// const CustomAlert = ({ children, onClose }) => (
//   <div className="fixed top-4 right-4 z-50 animate-slide-in">
//     <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
//       <CheckCircle2 className="h-4 w-4" />
//       <span>{children}</span>
//     </div>
//   </div>
// );

// export default function EnhancedDashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     localId: "",
//     profilePicture: "",
//     phoneNumber: "",
//     lastLogin: "",
//     accountCreated: "",
//     role: "User",
//     status: "Active",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated()) {
//       setLoading(true);
//       UserDetailsApi().then((response) => {
//         const userData = response.data.users[0];
//         setUser({
//           name: userData.displayName || "Not provided",
//           email: userData.email,
//           localId: userData.localId,
//           profilePicture: userData.photoUrl || "/api/placeholder/150/150",
//           phoneNumber: userData.phoneNumber || "Not provided",
//           lastLogin: new Date().toLocaleDateString(),
//           accountCreated: new Date().toLocaleDateString(),
//           role: "Standard User",
//           status: "Active",
//         });
//         setLoading(false);
//       });
//     }
//   }, []);

//   const logoutUser = () => {
//     setLoading(true);
//     setTimeout(() => {
//       logout();
//       navigate("/login");
//     }, 1000);
//   };

//   const handleEditProfile = () => {
//     setIsEditing(!isEditing);
//     if (isEditing) {
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000);
//     }
//   };

//   if (!isAuthenticated()) {
//     return <Navigate to="/login" />;
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <NavBar logoutUser={logoutUser} />
//       {showAlert && <CustomAlert>Profile updated successfully!</CustomAlert>}

//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         {/* Welcome Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform transition-all hover:scale-[1.01]">
//           <div className="flex items-center gap-4">
//             <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
//               <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//                 Welcome back, {user.name}!
//               </h1>
//               <p className="text-gray-600 dark:text-gray-300">
//                 Manage your account and settings
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex gap-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
//           <button
//             onClick={() => setActiveTab("profile")}
//             className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
//               activeTab === "profile"
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             }`}
//           >
//             <User className="h-4 w-4" />
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab("account")}
//             className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
//               activeTab === "account"
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             }`}
//           >
//             <Settings className="h-4 w-4" />
//             Account
//           </button>
//         </div>

//         {activeTab === "profile" ? (
//           /* Profile Section */
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
//             <div className="flex justify-between items-center mb-8">
//               <div className="flex items-center gap-3">
//                 <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 <h2 className="text-xl font-semibold dark:text-white">
//                   Profile Information
//                 </h2>
//               </div>
//               <button
//                 onClick={handleEditProfile}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
//                   isEditing
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-blue-500 hover:bg-blue-600"
//                 } text-white`}
//               >
//                 {isEditing ? (
//                   <Save className="h-4 w-4" />
//                 ) : (
//                   <Edit2 className="h-4 w-4" />
//                 )}
//                 {isEditing ? "Save Changes" : "Edit Profile"}
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="relative group">
//                   <img
//                     src={user.profilePicture}
//                     alt="Profile"
//                     className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg transition-transform duration-300 group-hover:scale-105"
//                   />
//                   {isEditing && (
//                     <div className="absolute inset-x-0 -bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                       <label className="cursor-pointer flex items-center gap-2 text-white px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg">
//                         <Camera className="h-4 w-4" />
//                         <span className="text-sm font-medium">
//                           Change Photo
//                         </span>
//                         <input
//                           type="file"
//                           className="hidden"
//                           accept="image/*"
//                         />
//                       </label>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-2 w-full">
//                   <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
//                     <CheckCircle2 className="h-4 w-4" />
//                     <span className="text-sm font-medium">
//                       Status: {user.status}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
//                     <Shield className="h-4 w-4" />
//                     <span className="text-sm font-medium">
//                       Role: {user.role}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:col-span-2 grid gap-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={user.name}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                       placeholder="Full Name"
//                     />
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       value={user.email}
//                       disabled
//                       className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                       placeholder="Email"
//                     />
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       value={user.phoneNumber}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                       placeholder="Phone Number"
//                     />
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={user.localId}
//                       disabled
//                       className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//                       placeholder="User ID"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Account Section */
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 <h2 className="text-xl font-semibold dark:text-white">
//                   Account Statistics
//                 </h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Account Created
//                     </span>
//                   </div>
//                   <p className="text-gray-900 dark:text-white font-medium">
//                     {user.accountCreated}
//                   </p>
//                 </div>
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Last Login
//                     </span>
//                   </div>
//                   <p className="text-gray-900 dark:text-white font-medium">
//                     {user.lastLogin}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 <h2 className="text-xl font-semibold dark:text-white">
//                   Security Settings
//                 </h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <Key className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span className="text-gray-900 dark:text-white">
//                       Two-Factor Authentication
//                     </span>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input type="checkbox" className="sr-only peer" />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                   </label>
//                 </div>
//                 <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span className="text-gray-900 dark:text-white">
//                       Email Notifications
//                     </span>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       className="sr-only peer"
//                       defaultChecked
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                   </label>
//                 </div>
//                 <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200">
//                   <Key className="h-4 w-4" />
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .animate-slide-in {
//           animation: slideIn 0.3s ease-out forwards;
//         }

//         @media (max-width: 768px) {
//           .grid-cols-3 {
//             grid-template-columns: 1fr;
//           }

//           .col-span-2 {
//             grid-column: span 1;
//           }

//           .w-40 {
//             width: 120px;
//           }

//           .h-40 {
//             height: 120px;
//           }

//           .text-2xl {
//             font-size: 1.5rem;
//           }

//           .p-6 {
//             padding: 1rem;
//           }
//         }

//         :root {
//           color-scheme: light dark;
//         }

//         @media (prefers-color-scheme: dark) {
//           .bg-white {
//             background-color: #1a1a1a;
//           }

//           .text-gray-800 {
//             color: #f0f0f0;
//           }

//           .text-gray-600 {
//             color: #a0a0a0;
//           }

//           .border {
//             border-color: #333;
//           }

//           .bg-gray-50 {
//             background-color: #262626;
//           }
//         }

//         * {
//           transition: background-color 0.3s ease, color 0.3s ease,
//             border-color 0.3s ease, transform 0.3s ease;
//         }

//         .hover-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .hover-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//         }

//         input:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// }

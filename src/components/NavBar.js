// import { Link } from "react-router-dom";
// import { isAuthenticated } from "../services/auth";

// export default function NavBar(props) {
//   return (
//     <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//       <a className="navbar-brand" href="/login">
//         SANTHOSH
//       </a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarsExampleDefault"
//         aria-controls="navbarsExampleDefault"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarsExampleDefault">
//         <ul className="navbar-nav mr-auto">
//           {!isAuthenticated() ? (
//             <li className="nav-item">
//               <Link className="nav-link" to="/register">
//                 Register
//               </Link>
//             </li>
//           ) : null}
//           {!isAuthenticated() ? (
//             <li>
//               <Link className="nav-link" to="/login">
//                 Login
//               </Link>
//             </li>
//           ) : null}
//           {isAuthenticated() ? (
//             <li className="nav-item">
//               <Link className="nav-link" to="/dashboard">
//                 Dashboard
//               </Link>
//             </li>
//           ) : null}
//           {isAuthenticated() ? (
//             <li>
//               <a
//                 className="nav-link"
//                 onClick={props.logoutUser}
//                 style={{ cursor: "pointer" }}
//               >
//                 Logout
//               </a>
//             </li>
//           ) : null}
//         </ul>
//       </div>
//     </nav>
//   );
// }
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import {
  Home,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
  UserPlus,
  Bell,
  Search,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export default function NavBar({ logoutUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark-mode");
  };

  const handleLogout = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      logoutUser();
    }, 1000);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <div className="brand-icon">
              <Home size={24} />
            </div>
            SANTHOSH
          </Link>

          <button
            className="navbar-toggler border-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <div className="search-bar me-auto">
              {searchOpen ? (
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search..."
                  autoFocus
                />
              ) : (
                <button
                  className="btn btn-link"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0">
              {!isAuthenticated() ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/register" ? "active" : ""
                      }`}
                      to="/register"
                    >
                      <UserPlus size={18} className="icon" />
                      <span>Register</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                      to="/login"
                    >
                      <LogIn size={18} className="icon" />
                      <span>Login</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/dashboard" ? "active" : ""
                      }`}
                      to="/dashboard"
                    >
                      <User size={18} className="icon" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn-notification">
                      <Bell size={18} />
                      <span className="notification-badge">2</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/settings">
                      <Settings size={18} className="icon" />
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>
                      <LogOut size={18} className="icon" />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button
                  className="nav-link theme-toggle"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showNotification && (
        <div className="notification-toast">
          <div className="toast-content">
            <LogOut size={18} />
            <span>Logging out...</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar {
          padding: 1rem 0;
          background: ${scrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0.7)"};
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          padding: 0.5rem 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand {
          font-weight: 700;
          font-size: 1.5rem;
          color: #0d6efd;
          transition: all 0.3s ease;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          background: rgba(13, 110, 253, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .navbar-brand:hover .brand-icon {
          transform: rotate(15deg);
          background: rgba(13, 110, 253, 0.2);
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: #495057;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #0d6efd;
          background: rgba(13, 110, 253, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #0d6efd;
          background: rgba(13, 110, 253, 0.1);
          font-weight: 500;
        }

        .icon {
          transition: transform 0.3s ease;
        }

        .nav-link:hover .icon {
          transform: scale(1.1);
        }

        .search-bar {
          position: relative;
          max-width: 300px;
          margin: 0 2rem;
        }

        .search-input {
          background: rgba(13, 110, 253, 0.1);
          border: none;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          padding-left: 2.5rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          background: white;
          box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
        }

        .btn-notification {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #dc3545;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(50%, -50%);
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: rgba(13, 110, 253, 0.1);
          transform: rotate(15deg);
        }

        .notification-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #0d6efd;
          color: white;
          padding: 1rem 2rem;
          border-radius: 10px;
          animation: slideIn 0.3s ease-out;
          z-index: 1000;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Dark mode styles */
        :global(.dark-mode) .navbar {
          background: rgba(33, 37, 41, 0.9);
        }

        :global(.dark-mode) .nav-link {
          color: #f8f9fa;
        }

        :global(.dark-mode) .search-input {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        :global(.dark-mode) .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Mobile styles */
        @media (max-width: 991px) {
          .navbar-collapse {
            background: inherit;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
          }

          .search-bar {
            margin: 1rem 0;
            max-width: 100%;
          }

          .nav-link {
            margin: 0.25rem 0;
          }
        }
      `}</style>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { LoginApi } from "../services/Api";
import { storeUserData } from "../services/storage";
import { isAuthenticated } from "../services/auth";
import { Link, Navigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  Shield,
  Coffee,
  Facebook,
  Github,
} from "lucide-react";
import { Chrome } from "lucide-react";
import NavBar from "../components/NavBar";
import { auth, googleProvider, facebookProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export default function LoginPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  // Add these functions inside your LoginPage component
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      // Store the token
      storeUserData(await user.getIdToken());

      setShowSuccessMessage(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setErrors({
        ...errors,
        custom_error:
          error.message || "An error occurred during Google sign in",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      // Store the token
      storeUserData(await user.getIdToken());

      setShowSuccessMessage(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      console.error("Facebook Sign In Error:", error);
      setErrors({
        ...errors,
        custom_error:
          error.message || "An error occurred during Facebook sign in",
      });
    } finally {
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setAnimate(true);
    // Check for stored email
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setInputs((prev) => ({ ...prev, email: storedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.email === "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      try {
        const response = await LoginApi(inputs);
        if (response.data && response.data.idToken) {
          // Handle "Remember Me"
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", inputs.email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          setShowSuccessMessage(true);
          storeUserData(response.data.idToken);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        }
      } catch (err) {
        console.error("Login Error:", err);
        if (err.response) {
          if (err.response.data.error.message === "EMAIL_NOT_FOUND") {
            setErrors({
              ...errors,
              custom_error: "This email is not registered!",
            });
          } else if (err.response.data.error.message === "INVALID_PASSWORD") {
            setErrors({
              ...errors,
              custom_error: "Invalid password! Please try again.",
            });
          } else {
            setErrors({
              ...errors,
              custom_error: "An error occurred. Please try again later.",
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }
    setErrors(errors);
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div
      className="bg-gradient min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <NavBar />
      <div className="container py-5">
        <div
          className={`row justify-content-center ${
            animate ? "fade-in-up" : ""
          }`}
        >
          <div className="col-md-8 col-lg-6">
            {showSuccessMessage ? (
              <div className="card shadow-lg border-0 rounded-lg success-animation">
                <div className="card-body text-center p-5">
                  <div className="check-circle mb-4">
                    <CheckCircle2 size={50} className="text-success" />
                  </div>
                  <h3 className="text-success mb-3">Login Successful!</h3>
                  <p className="text-muted">Redirecting to dashboard...</p>
                </div>
              </div>
            ) : (
              <div className="card shadow-lg border-0 rounded-lg hover-card">
                <div className="card-header bg-primary text-white text-center p-4">
                  <div className="header-icon mb-3">
                    <Shield size={40} />
                  </div>
                  <h2 className="font-weight-bold mb-2">Welcome Back!</h2>
                  <p className="mb-0 text-white-50">Sign in to your account</p>
                </div>

                <div className="card-body p-4">
                  {errors.custom_error && (
                    <div
                      className="alert alert-danger d-flex align-items-center fade-in"
                      role="alert"
                    >
                      <AlertCircle className="me-2" size={18} />
                      {errors.custom_error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="mb-4">
                      <label className="form-label">Email Address</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light">
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          className={`form-control form-control-lg ${
                            errors.email.required ? "is-invalid" : ""
                          }`}
                          placeholder="name@example.com"
                          name="email"
                          value={inputs.email}
                          onChange={handleInput}
                        />
                        {errors.email.required && (
                          <div className="invalid-feedback">
                            Email is required
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">
                        Password
                        <Link
                          to="/forgot-password"
                          className="float-end small text-primary"
                        >
                          Forgot Password?
                        </Link>
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light">
                          <Lock size={18} />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control form-control-lg ${
                            errors.password.required ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your password"
                          name="password"
                          value={inputs.password}
                          onChange={handleInput}
                        />
                        <button
                          type="button"
                          className="btn btn-light border"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                        {errors.password.required && (
                          <div className="invalid-feedback">
                            Password is required
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div className="d-grid mb-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <div
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            Signing in...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>

                    <div className="text-center mb-4">
                      <p className="mb-4">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="text-primary text-decoration-none"
                        >
                          Create Account
                        </Link>
                      </p>

                      <div className="divider-text mb-4">
                        <span className="bg-light px-3 text-muted">
                          Or continue with
                        </span>
                      </div>

                      <div className="d-flex justify-content-center gap-3">
                        <button
                          type="button"
                          className="btn btn-outline-secondary social-btn"
                          onClick={handleGoogleSignIn}
                          disabled={loading}
                        >
                          <Chrome size={18} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary social-btn"
                          onClick={handleFacebookSignIn}
                          disabled={loading}
                        >
                          <Facebook size={18} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary social-btn"
                        >
                          <Github size={18} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .success-animation {
          animation: successPulse 1.5s ease-out;
        }

        .hover-card {
          transition: all 0.3s ease;
        }

        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
        }

        .header-icon {
          background: rgba(255, 255, 255, 0.1);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .social-btn {
          width: 45px;
          height: 45px;
          padding: 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-btn:hover {
          background-color: #f8f9fa;
          transform: translateY(-2px);
        }

        .divider-text {
          position: relative;
          text-align: center;
        }

        .divider-text:before,
        .divider-text:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background-color: #dee2e6;
        }

        .divider-text:before {
          left: 0;
        }

        .divider-text:after {
          right: 0;
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes successPulse {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .bg-gradient {
          background-size: 200% 200%;
          animation: gradientAnimation 15s ease infinite;
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

          .header-icon {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}

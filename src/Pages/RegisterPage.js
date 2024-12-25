import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { RegisterApi } from "../services/Api";
import { isAuthenticated } from "../services/auth";
import { storeUserData } from "../services/storage";
import { Link, Navigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Shield,
  Smartphone,
} from "lucide-react";

export default function RegisterPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [formStep, setFormStep] = useState(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (event.target.name === "password") {
      checkPasswordStrength(event.target.value);
      checkPasswordCriteria(event.target.value);
    }
  };

  const checkPasswordCriteria = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 20) return "bg-danger";
    if (passwordStrength <= 40) return "bg-warning";
    if (passwordStrength <= 60) return "bg-info";
    if (passwordStrength <= 80) return "bg-primary";
    return "bg-success";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.name === "") {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email === "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError && agreeToTerms) {
      setLoading(true);
      try {
        const response = await RegisterApi(inputs);
        storeUserData(response.data.idToken);
        setShowSuccessMessage(true);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } catch (err) {
        if (err.response.data.error.message === "EMAIL_EXISTS") {
          setErrors({
            ...errors,
            custom_error: "This email is already registered",
          });
        } else if (
          String(err.response.data.error.message).includes("WEAK_PASSWORD")
        ) {
          setErrors({
            ...errors,
            custom_error: "Password should be stronger",
          });
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

  const renderPasswordStrengthIndicator = () => (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="small text-muted">Password Strength</span>
        <span className={`small ${getPasswordStrengthClass()}`}>
          {passwordStrength <= 20
            ? "Very Weak"
            : passwordStrength <= 40
            ? "Weak"
            : passwordStrength <= 60
            ? "Fair"
            : passwordStrength <= 80
            ? "Good"
            : "Strong"}
        </span>
      </div>
      <div className="progress" style={{ height: "8px" }}>
        <div
          className={`progress-bar ${getPasswordStrengthColor()} progress-bar-striped progress-bar-animated`}
          style={{
            width: `${passwordStrength}%`,
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );

  const getPasswordStrengthClass = () => {
    if (passwordStrength <= 40) return "text-danger";
    if (passwordStrength <= 60) return "text-warning";
    if (passwordStrength <= 80) return "text-info";
    return "text-success";
  };

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
                  <h3 className="text-success mb-3">
                    Registration Successful!
                  </h3>
                  <p className="text-muted">Redirecting to dashboard...</p>
                </div>
              </div>
            ) : (
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white text-center p-4">
                  <div className="header-icon mb-3">
                    <Shield size={40} />
                  </div>
                  <h2 className="font-weight-bold mb-2">Create Account</h2>
                  <p className="mb-0 text-white-50">
                    Join our secure platform today
                  </p>
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

                  <div className="progress-steps mb-4">
                    <div className="d-flex justify-content-between">
                      {[1, 2].map((step) => (
                        <div
                          key={step}
                          className={`step ${formStep >= step ? "active" : ""}`}
                          onClick={() => setFormStep(step)}
                        >
                          <div className="step-number">{step}</div>
                          <div className="step-label">
                            {step === 1 ? "Personal Info" : "Security"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation">
                    {formStep === 1 ? (
                      <div className="step-content fade-in">
                        <div className="mb-4">
                          <label className="form-label">Full Name</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <User size={18} />
                            </span>
                            <input
                              type="text"
                              className={`form-control form-control-lg ${
                                errors.name.required ? "is-invalid" : ""
                              }`}
                              placeholder="Enter your full name"
                              name="name"
                              onChange={handleInput}
                            />
                            {errors.name.required && (
                              <div className="invalid-feedback">
                                Name is required
                              </div>
                            )}
                          </div>
                        </div>

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
                            Phone Number (Optional)
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <Smartphone size={18} />
                            </span>
                            <input
                              type="tel"
                              className="form-control form-control-lg"
                              placeholder="Enter your phone number"
                              name="phone"
                              onChange={handleInput}
                            />
                          </div>
                        </div>

                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => setFormStep(2)}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="step-content fade-in">
                        <div className="mb-4">
                          <label className="form-label">Create Password</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light">
                              <Lock size={18} />
                            </span>
                            <input
                              type={showPassword ? "text" : "password"}
                              className={`form-control form-control-lg ${
                                errors.password.required ? "is-invalid" : ""
                              }`}
                              placeholder="Create a strong password"
                              name="password"
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
                          </div>

                          {renderPasswordStrengthIndicator()}

                          <div className="password-criteria mt-3">
                            <h6 className="mb-2 text-muted">
                              Password must contain:
                            </h6>
                            <div className="criteria-list">
                              {Object.entries(passwordCriteria).map(
                                ([criterion, met]) => (
                                  <div
                                    key={criterion}
                                    className={`criterion-item ${
                                      met ? "text-success" : "text-muted"
                                    }`}
                                  >
                                    {met ? (
                                      <CheckCircle2
                                        size={16}
                                        className="me-2"
                                      />
                                    ) : (
                                      <XCircle size={16} className="me-2" />
                                    )}
                                    {criterion === "length"
                                      ? "At least 8 characters"
                                      : criterion === "uppercase"
                                      ? "One uppercase letter"
                                      : criterion === "lowercase"
                                      ? "One lowercase letter"
                                      : criterion === "number"
                                      ? "One number"
                                      : "One special character"}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="terms"
                              checked={agreeToTerms}
                              onChange={(e) =>
                                setAgreeToTerms(e.target.checked)
                              }
                            />
                            <label className="form-check-label" htmlFor="terms">
                              I agree to the{" "}
                              <a href="#" className="text-primary">
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a href="#" className="text-primary">
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                        </div>

                        <div className="d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading || !agreeToTerms}
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
                                Creating your account...
                              </div>
                            ) : (
                              "Create Account"
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                            onClick={() => setFormStep(1)}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    )}
                  </form>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary text-decoration-none"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
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

        .progress-steps {
          padding: 20px 0;
        }

        .step {
          flex: 1;
          text-align: center;
          cursor: pointer;
          position: relative;
        }

        .step:not(:last-child):after {
          content: "";
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #e9ecef;
          z-index: 0;
        }

        .step.active:not(:last-child):after {
          background: #0d6efd;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e9ecef;
          color: #6c757d;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: #0d6efd;
          color: white;
        }

        .step-label {
          font-size: 0.875rem;
          color: #6c757d;
          transition: color 0.3s ease;
        }

        .step.active .step-label {
          color: #0d6efd;
          font-weight: 600;
        }

        .password-criteria {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }

        .criterion-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .input-group-text {
          border: none;
          background-color: #f8f9fa;
        }

        .form-control {
          border: 1px solid #dee2e6;
          transition: all 0.2s ease;
        }

        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(45deg, #0d6efd, #0b5ed7);
          border: none;
        }

        .btn-primary:hover {
          background: linear-gradient(45deg, #0b5ed7, #0a58ca);
          transform: translateY(-1px);
        }

        .card {
          transition: all 0.3s ease;
        }

        .card:hover {
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
          margin-bottom: 20px;
        }

        .check-circle {
          animation: checkmark 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
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

          .step-label {
            font-size: 0.75rem;
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

import React, { useState, useEffect } from "react";
import SignupComponent from "./MultiStepSignup";
import SigninComponent from "./SigninComponent";

// Types
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthLogicProps {
  onLogin?: (
    data: LoginData
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  onSignup?: (
    data: SignupData
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  isLoading?: boolean;
}

// Logic Component - handles all authentication logic
const AuthLogic: React.FC<AuthLogicProps> = ({
  onLogin,
  onSignup,
  isLoading = false,
}) => {
  // Mode state based on URL parameters
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Form state
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  // Read URL parameters and set mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Check for ?new parameter (signup mode)
    if (urlParams.has("new")) {
      setMode("signup");
    }
    // Check for ?login parameter (login mode)
    else if (urlParams.has("login")) {
      setMode("login");
    }
    // Fallback: check for traditional mode parameters
    else {
      const authMode =
        urlParams.get("mode") || urlParams.get("type") || "login";
      if (authMode === "signup" || authMode === "register") {
        setMode("signup");
      } else {
        setMode("login");
      }
    }
  }, []);

  // Listen for URL changes (for SPA navigation)
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has("new")) {
        setMode("signup");
      } else if (urlParams.has("login")) {
        setMode("login");
      } else {
        // Default to login if no recognized parameters
        setMode("login");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Function to toggle mode and update URL
  const handleToggleMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);

    // Update URL without page refresh using the new parameter style
    const currentUrl = new URL(window.location.href);

    // Clear existing auth-related parameters
    currentUrl.searchParams.delete("login");
    currentUrl.searchParams.delete("new");
    currentUrl.searchParams.delete("mode");
    currentUrl.searchParams.delete("type");

    // Set the appropriate parameter
    if (newMode === "signup") {
      currentUrl.searchParams.set("new", "");
    } else {
      currentUrl.searchParams.set("login", "");
    }

    window.history.pushState({}, "", currentUrl.toString());

    // Clear form and errors when switching modes
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
    setErrors({});
    setSubmitStatus({ type: null, message: "" });
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Signup specific validations
    if (mode === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof SignupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for the field being edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitStatus({ type: null, message: "" });

    try {
      if (mode === "login" && onLogin) {
        const result = await onLogin({
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          setSubmitStatus({
            type: "success",
            message: result.message || "Login successful!",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: result.message || "Login failed. Please try again.",
          });
        }
      } else if (mode === "signup" && onSignup) {
        const result = await onSignup(formData);

        if (result.success) {
          setSubmitStatus({
            type: "success",
            message: result.message || "Account created successfully!",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: result.message || "Signup failed. Please try again.",
          });
        }
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const commonProps = {
    formData,
    errors,
    submitStatus,
    isLoading,
    onInputChange: handleInputChange,
    onSubmit: handleSubmit,
    onToggleMode: handleToggleMode,
  };

  if (mode === "login") {
    return <SigninComponent />;
  }

  return <SignupComponent />;
};

export default AuthLogic;

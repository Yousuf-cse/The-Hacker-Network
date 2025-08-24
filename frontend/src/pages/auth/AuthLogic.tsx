import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignupComponent from "./MultiStepSignup";
import SigninComponent from "./SigninComponent";

const AuthLogic = () => {
  const location = useLocation();
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.has("new")) {
      setMode("signup");
    } else if (urlParams.has("login")) {
      setMode("login");
    } else {
      const authMode =
        urlParams.get("mode") || urlParams.get("type") || "login";
      if (authMode === "signup" || authMode === "register") {
        setMode("signup");
      } else {
        setMode("login");
      }
    }
  }, [location.search]);

  return mode === "login" ? <SigninComponent /> : <SignupComponent />;
};

export default AuthLogic;

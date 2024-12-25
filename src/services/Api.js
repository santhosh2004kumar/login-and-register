import { auth } from "./firebase";
import axios from "axios";
import { getUserData } from "./storage";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";

export const RegisterApi = (inputs) => {
  const data = {
    displayName: inputs.name,
    email: inputs.email,
    password: inputs.password,
  };

  return axios.post("/accounts:signUp", data, {
    params: {
      key: auth.app.options.apiKey, // Correct API key access
    },
  });
};

export const LoginApi = (inputs) => {
  const data = {
    email: inputs.email,
    password: inputs.password,
    returnSecureToken: true, // Required for Firebase Authentication
  };

  return axios.post("/accounts:signInWithPassword", data, {
    params: {
      key: auth.app.options.apiKey, // Correct API key access
    },
  });
};

export const UserDetailsApi = () => {
  const data = { idToken: getUserData() }; // Retrieve the user's ID token stored during login

  return axios.post("/accounts:lookup", data, {
    params: {
      key: auth.app.options.apiKey, // Use the API key for authentication
    },
  });
};

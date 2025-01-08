import {create} from "zustand"
import axios from "axios"
import API_URL from "../utilities/config.js"

axios.defaults.withCredentials = true;

export const userStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  //sign up
  signup: async(name, email, password) => {
    set({isLoading: true, error: null, message: null});

    if (!name || !email || !password  ) {
      set({ isLoading: false, error: "All fields are required" });
      return { success: false, error: "All field are required" };
    
    }
    try {
      const response = await axios.post(`${API_URL}/signup`, {name, email, password});
      set({user:response.data.user, isAuthenticated: false, isLoading:false, message: "Signup Successful" });
      return {success: true, message: "Signup Successful"};

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error signing up";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  //verify email
  verifyEmail: async(code) => {
    set({isLoading: true, error: null, message: null});
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {code});
      set({user: response.data.user, isAuthenticated: true, isLoading: false});
      return {success: true, message: "Verification successful email has been sent for confirmation"}

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error verifying email";
      set({error: errorMessage, isLoading: false});
      return {success: false, error: errorMessage}
    }
  },

  //login
  login: async (email, password) => {
    set({isLoading: true, error: null, message: null});

    if (!email || !password) {
      set({ isLoading: false, error: "Please fill in all fields" });
      return { success: false, error: "Please fill in all fields" };
    }

    try {
    const response = await axios.post(`${API_URL}/login`, {email, password});
      set({
        user:response.data.user, 
        isAuthenticated: true, 
        isLoading: false,
        message: "Login Successful"
      });
      return { success: true, message: "Login successful" };

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error login";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  //logout
  logout: async() => {
    set({isLoading: true, error: null});
    try {
      await axios.post(`${API_URL}/logout`);
      set({user: null, isAuthenticated: false, isLoading: false});
    } catch (error) {
      console.error("Error logging out:", error);
      const errorMessage = error.message || "Network Error";
      set({ error: errorMessage, isLoading: false });
    }
  },

 // check authentication
 checkAuth: async() => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading animation
  set({isCheckingAuth: true, error: null});
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
  } catch (error) {
    set({error: null, isCheckingAuth: false, isAuthenticated: false});
  }
},


  //Forgot Password
  forgotPassword: async(email) => {
    set({isLoading: true, error: null});

    if (!email) {
      set({ isLoading: false, error: "Email is required" });
      return {success: false, error:"Email is required" }
    }
    
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {email});
      set({message: response.data.message, isLoading: false});
      return { success: true, message: response.data.message };

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error sending reset password link";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage }
  }
},
  //Reset Password
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null, message: null });

    if (!password) {
      set({ isLoading: false, error: "Please fill in all fields" });
      return { success: false, error: "Please fill in all fields" };
    }

    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ isLoading: false, message: response.message });
      return { success: true, message: "Password reset successfully" };

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error resetting password";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // validate reset token
  validateResetToken: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/validate-reset-token/${token}`);
      if (response.success){
      return { success: true, message: "Valid token" };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Invalid or expired reset token";
      return { success: false, error: errorMessage };
    }
  },
  //get User info
  getUserInfo: async (navigate) => {
    try {
      const response = await axios.get(`${API_URL}/get-user`);
      if (response.data && response.data.user) {
        set({ user: response.data.user, isAuthenticated: true });
      }
    } catch (error) {
     
        const errorMessage = error.response?.data?.error || "Error fetching user info";
        set({ error: null });
      }
    }



}))
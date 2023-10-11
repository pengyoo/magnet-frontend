import { AuthBindings } from "@refinedev/core";

import axiosInstance from "./services/axios-instance";

export const TOKEN_KEY = "auth";
export const LOGIN_USER = "LOGIN_USER";
import {API_URL} from "./services/axios-instance";
import { User } from "./interfaces";

export const authProvider: AuthBindings = {
  login: async ({email, password}) => {
    const response = await axiosInstance.post(`${API_URL}/users/login`, {email, password});
    if(response.data){
      localStorage.setItem(TOKEN_KEY, response.data.token);
      const jsonUser = JSON.stringify(response.data);
      localStorage.setItem(LOGIN_USER, jsonUser);

      window.location.reload();

      return {
        success: true,
        redirectTo: "/home",
      };

     
    }      
    
    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LOGIN_USER);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userString = localStorage.getItem(LOGIN_USER);
    if (token && userString) {
      const user: User = JSON.parse(userString);
      return {
        id: user?.id,
        name: user?.email,
        avatar: "https://i.pravatar.cc/300",
        email: user?.email,
        profile: user?.profile
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};

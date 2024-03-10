import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  const getSession = async () => {
    setLoading(true); // Set loading to true while fetching session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionData && sessionData.session) {
      setSession(sessionData.session);
      setUser(sessionData.session.user);
      if (sessionData.session.user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", sessionData.session.user.email);
        if (error) {
          console.error("Error fetching user role:", error);
        } else if (data && data.length > 0) {
          setDbUser(data[0]);
          setUserRole(data[0].role);
        }
      }
    } else if (sessionError) {
      console.error("Error getting session:", sessionError.message);
    }
    setLoading(false); // Set loading to false after fetching session and user role
  };

  useEffect(() => {
    getSession(); // Correctly call getSession within useEffect

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth functions
  const login = async (info) => {
    let email = info.email;
    let password = info.password;
    console.log("email1: ", email, "password:1", password);
    setLoading(true);
    const { userI, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(userI);
    getSession();
    setLoading(false);
    return { userI, error };
  };

  const signup = async (
    email,
    password,
    role,
    first_name,
    last_name,
    phone_number
  ) => {
    setLoading(true);
    try {
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const { error: insertError } = await supabase.from("users").insert([
        {
          email,
          role,
          first_name,
          last_name,
          phone_number,
        },
      ]);

      if (insertError) throw insertError;

      // Successful sign up
      setUser(user);
      console.log("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error.message);
    } finally {
      getSession();
      navigate("/");
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
    setUserRole(null);
    setDbUser(null);
    setSession(null);
    return { error };
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loading,
    session,
    userRole,
    dbUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

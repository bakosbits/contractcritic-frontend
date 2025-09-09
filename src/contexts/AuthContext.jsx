import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error) {
                console.error("❌ Error getting session:", error);
            } else {
                setSession(session);
                setUser(session?.user ?? null);
            }
            setLoading(false);
        };

        getInitialSession();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Sign in with email and password
    const signInWithEmail = async (email, password) => {
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            return { data, error: null };
        } catch (error) {
            console.error("Error signing in:", error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Sign up with email and password
    const signUpWithEmail = async (email, password) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            return { data, error: null };
        } catch (error) {
            console.error("Error signing up:", error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    // Sign in with OAuth provider
    const signInWithProvider = async (provider) => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            return { data, error: null };
        } catch (error) {
            console.error(`Error signing in with ${provider}:`, error);
            return { data: null, error };
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            return { error: null };
        } catch (error) {
            console.error("Error signing out:", error);
            return { error };
        } finally {
            setLoading(false);
        }
    };

    // Reset password
    const resetPassword = async (email) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(
                email,
                {
                    redirectTo: `${window.location.origin}/auth/reset-password`,
                },
            );

            if (error) throw error;

            return { data, error: null };
        } catch (error) {
            console.error("Error resetting password:", error);
            return { data: null, error };
        }
    };

    // Update password
    const updatePassword = async (password) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            return { data, error: null };
        } catch (error) {
            console.error("Error updating password:", error);
            return { data: null, error };
        }
    };

    // Get access token for API calls
    const getAccessToken = async () => {
        if (!session) return null;

        try {
            const {
                data: { session: currentSession },
                error,
            } = await supabase.auth.getSession();
            if (error) throw error;

            return currentSession?.access_token || null;
        } catch (error) {
            console.error("Error getting access token:", error);
            return null;
        }
    };

    const value = {
        user,
        session,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithProvider,
        signOut,
        resetPassword,
        updatePassword,
        getAccessToken,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

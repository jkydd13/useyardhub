import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getSupabaseBrowserClient } from "../lib/supabaseBrowser";

const AuthContext = createContext(null);

function friendlyAuthError(error) {
  const message = String(error?.message ?? "").trim();

  if (!message) {
    return "YardHub could not complete that account request.";
  }

  if (message.toLowerCase().includes("invalid login credentials")) {
    return "The email or password is incorrect.";
  }

  if (message.toLowerCase().includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }

  return message;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const mountedRef = useRef(true);
  const profileRequestRef = useRef(0);

  const loadProfile = useCallback(async (userId) => {
    const requestId = profileRequestRef.current + 1;
    profileRequestRef.current = requestId;

    if (!userId) {
      if (mountedRef.current) {
        setProfile(null);
        setProfileLoading(false);
      }
      return null;
    }

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return null;
    }

    if (mountedRef.current) {
      setProfileLoading(true);
    }

    const { data, error } = await supabase
      .from("account_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!mountedRef.current || requestId !== profileRequestRef.current) {
      return data ?? null;
    }

    if (error) {
      setProfile(null);
      setProfileLoading(false);
      throw error;
    }

    setProfile(data ?? null);
    setProfileLoading(false);
    return data ?? null;
  }, []);

  const applySession = useCallback(
    async (nextSession) => {
      if (!mountedRef.current) return;

      const nextUser = nextSession?.user ?? null;
      setSession(nextSession ?? null);
      setUser(nextUser);

      if (!nextUser) {
        profileRequestRef.current += 1;
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      try {
        await loadProfile(nextUser.id);
      } catch (error) {
        if (mountedRef.current) {
          setAuthError(
            `Signed in, but the profile could not load: ${friendlyAuthError(error)}`
          );
        }
      }
    },
    [loadProfile]
  );

  useEffect(() => {
    mountedRef.current = true;
    let subscription = null;

    async function initialize() {
      try {
        const supabase = getSupabaseBrowserClient();

        if (!supabase) return;

        const {
          data: { session: initialSession },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        await applySession(initialSession);

        const { data } = supabase.auth.onAuthStateChange(
          (_event, nextSession) => {
            window.setTimeout(() => {
              void applySession(nextSession);
            }, 0);
          }
        );

        subscription = data.subscription;
      } catch (error) {
        if (mountedRef.current) {
          setAuthError(friendlyAuthError(error));
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    void initialize();

    return () => {
      mountedRef.current = false;
      subscription?.unsubscribe();
    };
  }, [applySession]);

  const signIn = useCallback(async ({ email, password }) => {
    setAuthError("");
    const supabase = getSupabaseBrowserClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      throw new Error(friendlyAuthError(error));
    }

    await applySession(data.session);
    return data;
  }, [applySession]);

  const signUp = useCallback(
    async ({ displayName, email, password, emailRedirectTo }) => {
      setAuthError("");
      const supabase = getSupabaseBrowserClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            display_name: displayName.trim(),
          },
          emailRedirectTo,
        },
      });

      if (error) {
        throw new Error(friendlyAuthError(error));
      }

      if (data.session) {
        await applySession(data.session);
      }

      return data;
    },
    [applySession]
  );

  const signOut = useCallback(async () => {
    setAuthError("");
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      throw new Error(friendlyAuthError(error));
    }

    await applySession(null);
  }, [applySession]);

  const refreshProfile = useCallback(async () => {
    if (!user?.id) return null;
    return loadProfile(user.id);
  }, [loadProfile, user?.id]);

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      profileLoading,
      authError,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [
      session,
      user,
      profile,
      loading,
      profileLoading,
      authError,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

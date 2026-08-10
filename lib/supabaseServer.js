import { createClient } from "@supabase/supabase-js";

let adminClient = null;
let authVerifierClient = null;

function getSupabaseUrl() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
  }

  return value;
}

function getSupabasePublicKey() {
  const value =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!value) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return value;
}

function getSupabaseServerSecret() {
  const value =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!value) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return value;
}

export function getSupabaseAdminClient() {
  if (!adminClient) {
    adminClient = createClient(getSupabaseUrl(), getSupabaseServerSecret(), {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }

  return adminClient;
}

function getSupabaseAuthVerifierClient() {
  if (!authVerifierClient) {
    authVerifierClient = createClient(getSupabaseUrl(), getSupabasePublicKey(), {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }

  return authVerifierClient;
}

function readBearerToken(req) {
  const authorization = String(req.headers.authorization ?? "");
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? "";
}

export function getSupabaseUserClient(req) {
  const accessToken = readBearerToken(req);

  if (!accessToken) {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }

  return createClient(getSupabaseUrl(), getSupabasePublicKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

export async function requireAuthenticatedUser(req) {
  const accessToken = readBearerToken(req);

  if (!accessToken) {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }

  const verifier = getSupabaseAuthVerifierClient();
  const {
    data: { user },
    error,
  } = await verifier.auth.getUser(accessToken);

  if (error || !user) {
    const authError = new Error("Your YardHub session is no longer valid.");
    authError.statusCode = 401;
    throw authError;
  }

  return user;
}

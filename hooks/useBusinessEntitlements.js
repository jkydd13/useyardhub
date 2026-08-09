import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchMyBusinessEntitlements,
  getBusinessEntitlementErrorMessage,
  summarizeBusinessEntitlements,
} from "../lib/businessEntitlements";

export function useBusinessEntitlements() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const requestRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    if (!user?.id) {
      setRows([]);
      setError("");
      setLoading(false);
      return [];
    }

    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setLoading(true);
    setError("");

    try {
      const nextRows = await fetchMyBusinessEntitlements();

      if (mountedRef.current && requestId === requestRef.current) {
        setRows(nextRows);
      }

      return nextRows;
    } catch (nextError) {
      if (mountedRef.current && requestId === requestRef.current) {
        setRows([]);
        setError(getBusinessEntitlementErrorMessage(nextError));
      }

      return [];
    } finally {
      if (mountedRef.current && requestId === requestRef.current) {
        setLoading(false);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (authLoading) return;

    if (!user?.id) {
      requestRef.current += 1;
      setRows([]);
      setError("");
      setLoading(false);
      return;
    }

    void refresh();
  }, [authLoading, refresh, user?.id]);

  const summary = useMemo(
    () => summarizeBusinessEntitlements(rows),
    [rows]
  );

  return {
    entitlements: rows,
    summary,
    loading: authLoading || loading,
    error,
    refresh,
  };
}

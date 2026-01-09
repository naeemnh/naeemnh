import { useState, useEffect, useRef } from "react";
import { fetchOpenGraphData } from "@/lib/og-utils";
import { OpenGraphData } from "@/app/api/og/route";

interface UseOpenGraphReturn {
  data: OpenGraphData | null;
  loading: boolean;
  error: Error | null;
}

/**
 * React hook to fetch Open Graph data for a URL
 * @param url - The URL to fetch Open Graph data from
 * @param enabled - Whether to fetch the data (default: true)
 * @returns Object with data, loading state, and error
 */
export function useOpenGraph(url: string | null, enabled: boolean = true): UseOpenGraphReturn {
  const [data, setData] = useState<OpenGraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(() => !!(url && enabled));
  const [error, setError] = useState<Error | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!url || !enabled) {
      // Use queueMicrotask to defer state update (not synchronous)
      queueMicrotask(() => {
        if (!cancelledRef.current) {
          setLoading(false);
        }
      });
      return;
    }

    cancelledRef.current = false;

    const fetchOGData = async () => {
      // Defer state updates to avoid synchronous setState in effect
      await Promise.resolve();

      if (!cancelledRef.current) {
        setLoading(true);
        setError(null);
      }

      try {
        const ogData = await fetchOpenGraphData(url);
        if (!cancelledRef.current) {
          setData(ogData);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelledRef.current) {
          setError(err instanceof Error ? err : new Error("Failed to fetch OG data"));
          setLoading(false);
        }
      }
    };

    fetchOGData();

    return () => {
      cancelledRef.current = true;
    };
  }, [url, enabled]);

  return { data, loading, error };
}

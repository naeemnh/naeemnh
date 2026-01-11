import { OpenGraphData } from "@/app/api/og/route";

/**
 * Fetches Open Graph data for a given URL
 * @param url - The URL to fetch Open Graph data from
 * @returns Promise with Open Graph data or null if fetch fails
 */
export async function fetchOpenGraphData(url: string): Promise<OpenGraphData | null> {
  try {
    const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch OG data: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Open Graph data:", error);
    return null;
  }
}

/**
 * Fetches Open Graph data for multiple URLs in parallel
 * @param urls - Array of URLs to fetch Open Graph data from
 * @returns Promise with array of Open Graph data (null for failed fetches)
 */
export async function fetchMultipleOpenGraphData(
  urls: string[]
): Promise<(OpenGraphData | null)[]> {
  const promises = urls.map((url) => fetchOpenGraphData(url));
  return Promise.all(promises);
}


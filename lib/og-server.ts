import { OpenGraphData } from "@/app/api/og/route";

/**
 * Decodes HTML entities in a string
 * @param str - String with HTML entities
 * @returns Decoded string
 */
function decodeHtmlEntities(str: string): string {
  if (!str) return str;

  // Common HTML entities
  const entityMap: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
  };

  // Replace named entities
  let decoded = str;
  for (const [entity, char] of Object.entries(entityMap)) {
    decoded = decoded.replace(new RegExp(entity, "gi"), char);
  }

  // Replace numeric entities (&#123; or &#x7B;)
  decoded = decoded.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  return decoded;
}

/**
 * Server-side function to fetch Open Graph data using native fetch
 * Use this in Server Components, API routes, or during build time
 * @param url - The URL to fetch Open Graph data from
 * @returns Promise with Open Graph data or null if fetch fails
 */
export async function fetchOpenGraphDataServer(url: string): Promise<OpenGraphData | null> {
  try {
    // Validate URL format
    const urlObj = new URL(url);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Fetch the HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OpenGraphScraper/1.0)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Parse Open Graph tags using regex (lightweight, no dependencies)
    const ogData: OpenGraphData = {
      url: url,
    };

    // Extract og:title or title
    // Use a more flexible regex that handles HTML entities in content values
    const ogTitleMatch =
      html.match(/<meta\s+property=["']og:title["']\s+content=["']((?:[^"']|&[^;]+;)+)["']/i) ||
      html.match(/<meta\s+content=["']((?:[^"']|&[^;]+;)+)["']\s+property=["']og:title["']/i);
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const rawTitle = ogTitleMatch?.[1] || titleMatch?.[1]?.trim();
    ogData.title = rawTitle ? decodeHtmlEntities(rawTitle) : undefined;

    // Extract og:description or meta description
    // Use a more flexible regex that handles HTML entities in content values
    const ogDescMatch =
      html.match(/<meta\s+property=["']og:description["']\s+content=["']((?:[^"']|&[^;]+;)+)["']/i) ||
      html.match(/<meta\s+content=["']((?:[^"']|&[^;]+;)+)["']\s+property=["']og:description["']/i);
    const metaDescMatch =
      html.match(/<meta\s+name=["']description["']\s+content=["']((?:[^"']|&[^;]+;)+)["']/i) ||
      html.match(/<meta\s+content=["']((?:[^"']|&[^;]+;)+)["']\s+name=["']description["']/i);
    const rawDescription = ogDescMatch?.[1] || metaDescMatch?.[1];
    ogData.description = rawDescription ? decodeHtmlEntities(rawDescription) : undefined;

    // Extract og:image
    const ogImageMatch =
      html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
    if (ogImageMatch?.[1]) {
      // Resolve relative URLs to absolute
      try {
        ogData.image = new URL(ogImageMatch[1], url).toString();
      } catch {
        ogData.image = ogImageMatch[1];
      }
    }

    // Extract og:url
    const ogUrlMatch =
      html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i) || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:url["']/i);
    if (ogUrlMatch?.[1]) {
      try {
        ogData.url = new URL(ogUrlMatch[1], url).toString();
      } catch {
        ogData.url = url;
      }
    }

    // Extract og:site_name
    // Use a more flexible regex that handles HTML entities in content values
    const ogSiteNameMatch =
      html.match(/<meta\s+property=["']og:site_name["']\s+content=["']((?:[^"']|&[^;]+;)+)["']/i) ||
      html.match(/<meta\s+content=["']((?:[^"']|&[^;]+;)+)["']\s+property=["']og:site_name["']/i);
    const rawSiteName = ogSiteNameMatch?.[1];
    ogData.siteName = rawSiteName ? decodeHtmlEntities(rawSiteName) : undefined;

    return ogData;
  } catch (error) {
    console.error(`Error fetching Open Graph data for ${url}:`, error);
    return null;
  }
}

/**
 * Fetches Open Graph data for multiple URLs in parallel (server-side)
 * @param urls - Array of URLs to fetch Open Graph data from
 * @returns Promise with array of Open Graph data (null for failed fetches)
 */
export async function fetchMultipleOpenGraphDataServer(urls: string[]): Promise<(OpenGraphData | null)[]> {
  const promises = urls.map((url) => fetchOpenGraphDataServer(url));
  return Promise.all(promises);
}

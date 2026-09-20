// Best-effort limiter for /api/quote. The counters live in this server instance's memory, so on a
// serverless host each warm instance counts separately and a cold start resets them. It stops one
// visitor or script from flooding the inbox; it is not a hard global cap. For that, add a rate-limit
// rule on /api/quote in the host's firewall (Vercel: Firewall > Custom rules > Rate limit).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED = 5000; // bounds memory if many distinct addresses hit the route

const hits = new Map<string, { count: number; resetAt: number }>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export function rateLimit(key: string, now = Date.now()): RateLimitResult {
  if (hits.size >= MAX_TRACKED) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    // Still full of live entries: drop the oldest so the map cannot grow without bound.
    while (hits.size >= MAX_TRACKED) hits.delete(hits.keys().next().value as string);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

// Vercel sets x-forwarded-for itself, so the first entry is the real client. Requests with no
// address at all share one bucket.
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

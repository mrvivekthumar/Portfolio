// lib/rate-limit.ts - Rate Limiting Utility
interface RateLimitOptions {
    interval: number; // Time window in milliseconds
    uniqueTokenPerInterval: number; // Max unique tokens (IPs) per interval
}

interface TokenBucket {
    count: number;
    lastRefill: number;
}

// In-memory store (use Redis in production for multiple instances)
const tokenStore = new Map<string, TokenBucket>();

export function rateLimit(options: RateLimitOptions) {
    return {
        check: async (limit: number, token: string): Promise<void> => {
            const now = Date.now();
            const bucket = tokenStore.get(token) || { count: limit, lastRefill: now };

            // Refill bucket if interval has passed
            const timeSinceLastRefill = now - bucket.lastRefill;
            if (timeSinceLastRefill >= options.interval) {
                bucket.count = limit;
                bucket.lastRefill = now;
            }

            // Check if request is allowed
            if (bucket.count <= 0) {
                throw new Error('Rate limit exceeded');
            }

            // Consume token
            bucket.count--;
            tokenStore.set(token, bucket);

            // Clean up old entries to prevent memory leaks
            if (tokenStore.size > options.uniqueTokenPerInterval) {
                const entries = Array.from(tokenStore.entries());
                const sortedEntries = entries.sort(([, a], [, b]) => b.lastRefill - a.lastRefill);

                // Keep only the most recent entries
                tokenStore.clear();
                sortedEntries.slice(0, options.uniqueTokenPerInterval).forEach(([key, value]) => {
                    tokenStore.set(key, value);
                });
            }
        }
    };
}
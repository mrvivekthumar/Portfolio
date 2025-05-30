// lib/sanitize.ts - Input Sanitization
/**
 * Sanitize user input to prevent XSS and other injection attacks
 */
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
        return '';
    }

    return input
        .trim()
        // Remove null bytes
        .replace(/\0/g, '')
        // Remove HTML tags (basic protection)
        .replace(/<[^>]*>/g, '')
        // Remove potentially dangerous characters
        .replace(/[<>'"]/g, (match) => {
            const entities: { [key: string]: string } = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;'
            };
            return entities[match] || match;
        })
        // Limit length
        .substring(0, 10000); // Adjust max length as needed
}

/**
 * Sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
    if (typeof email !== 'string') {
        return '';
    }

    return email
        .trim()
        .toLowerCase()
        .replace(/[^\w@.-]/g, '') // Only allow word chars, @, ., and -
        .substring(0, 254); // RFC 5321 limit
}

/**
 * Sanitize and validate URLs
 */
export function sanitizeUrl(url: string): string {
    if (typeof url !== 'string') {
        return '';
    }

    try {
        const urlObj = new URL(url);
        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return '';
        }
        return urlObj.toString();
    } catch {
        return '';
    }
}
// lib/validation.ts - Form Validation
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    services?: string | null;
}

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export function validateContactForm(data: ContactFormData): ValidationResult {
    const errors: string[] = [];

    // Name validation
    if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    if (data.name && data.name.length > 100) {
        errors.push('Name must be less than 100 characters');
    }
    if (data.name && !/^[a-zA-Z\s'-]+$/.test(data.name)) {
        errors.push('Name contains invalid characters');
    }

    // Email validation
    if (!data.email) {
        errors.push('Email is required');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }
        if (data.email.length > 254) {
            errors.push('Email address is too long');
        }
    }

    // Subject validation
    if (!data.subject || data.subject.length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    if (data.subject && data.subject.length > 200) {
        errors.push('Subject must be less than 200 characters');
    }

    // Message validation
    if (!data.message || data.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    if (data.message && data.message.length > 5000) {
        errors.push('Message must be less than 5000 characters');
    }

    // Check for spam patterns
    if (data.message && isSpamLike(data.message)) {
        errors.push('Message appears to be spam');
    }

    // Services validation (optional)
    if (data.services && data.services.length > 500) {
        errors.push('Services list is too long');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Basic spam detection
 */
function isSpamLike(text: string): boolean {
    const spamPatterns = [
        /viagra|cialis|pharmacy/i,
        /make.*money.*fast/i,
        /click.*here.*now/i,
        /free.*gift/i,
        /(http[s]?:\/\/[^\s]+){3,}/i, // Multiple URLs
        /(.)\1{10,}/i, // Repeated characters
        /[A-Z]{10,}/g, // Excessive caps
    ];

    return spamPatterns.some(pattern => pattern.test(text));
}

/**
 * Validate individual fields
 */
export const fieldValidators = {
    name: (value: string): string | null => {
        if (!value || value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 100) return 'Name is too long';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name contains invalid characters';
        return null;
    },

    email: (value: string): string | null => {
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        if (value.length > 254) return 'Email is too long';
        return null;
    },

    subject: (value: string): string | null => {
        if (!value || value.length < 3) return 'Subject must be at least 3 characters';
        if (value.length > 200) return 'Subject is too long';
        return null;
    },

    message: (value: string): string | null => {
        if (!value || value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 5000) return 'Message is too long';
        return null;
    }
};
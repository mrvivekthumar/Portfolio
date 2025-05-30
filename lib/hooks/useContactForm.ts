// hooks/useContactForm.ts - Fixed Double Submission Issue
import { useState, useCallback, useRef } from 'react';
import { fieldValidators } from '@/lib/validation';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    services?: string;
}

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

interface FieldErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

interface ContactFormReturn {
    formStatus: FormStatus;
    fieldErrors: FieldErrors;
    sendEmail: (formData: FormData) => Promise<{ success: boolean; data?: any; error?: string }>;
    resetStatus: () => void;
    validateField: (field: keyof FormData, value: string) => string | null;
    isLoading: boolean;
    retryAfter?: number;
}

export const useContactForm = (): ContactFormReturn => {
    const [formStatus, setFormStatus] = useState<FormStatus>({
        type: 'idle',
        message: ''
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [retryAfter, setRetryAfter] = useState<number>();

    // 👈 FIXED: Prevent double submission with ref
    const isSubmittingRef = useRef(false);
    const lastSubmissionRef = useRef<number>(0);

    const validateField = useCallback((field: keyof FormData, value: string): string | null => {
        if (field === 'services') return null; // Services is optional

        const validator = fieldValidators[field as keyof typeof fieldValidators];
        return validator ? validator(value) : null;
    }, []);

    const sendEmail = useCallback(async (formData: FormData) => {
        // 👈 FIXED: Prevent double submission
        const now = Date.now();
        const timeSinceLastSubmission = now - lastSubmissionRef.current;

        // Prevent submissions within 3 seconds of each other
        if (isSubmittingRef.current || timeSinceLastSubmission < 3000) {
            console.log('Prevented double submission');
            return { success: false, error: 'Please wait before submitting again' };
        }

        isSubmittingRef.current = true;
        lastSubmissionRef.current = now;

        setFormStatus({ type: 'loading', message: 'Sending your message...' });
        setFieldErrors({});
        setRetryAfter(undefined);

        try {
            // Client-side validation
            const errors: FieldErrors = {};
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'services' && typeof value === 'string') {
                    const error = validateField(key as keyof FormData, value);
                    if (error) {
                        errors[key as keyof FieldErrors] = error;
                    }
                }
            });

            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                setFormStatus({
                    type: 'error',
                    message: 'Please fix the errors above.'
                });
                return { success: false, error: 'Validation failed' };
            }

            // 👈 FIXED: Add submission timestamp to prevent server-side duplicates
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: now, // Unique timestamp
                    clientId: Math.random().toString(36).substr(2, 9), // Unique client ID
                    userAgent: navigator.userAgent,
                    website: '', // Honeypot field
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle rate limiting
                if (response.status === 429) {
                    setRetryAfter(result.retryAfter || 60);
                    setFormStatus({
                        type: 'error',
                        message: result.error || 'Too many requests. Please wait a moment before trying again.'
                    });
                    return { success: false, error: result.error };
                }

                // Handle validation errors
                if (response.status === 400) {
                    setFormStatus({
                        type: 'error',
                        message: result.error || 'Please check your input and try again.'
                    });
                    return { success: false, error: result.error };
                }

                // Handle server errors
                throw new Error(result.error || `Server error: ${response.status}`);
            }

            setFormStatus({
                type: 'success',
                message: result.message || 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
            });

            return { success: true, data: result };

        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Something went wrong. Please try again or contact me directly.';

            setFormStatus({
                type: 'error',
                message: errorMessage
            });

            // Log error for monitoring (in production, send to error tracking service)
            console.error('[CONTACT_FORM_ERROR]', {
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : error,
                formData: { ...formData, message: '[REDACTED]' }
            });

            return { success: false, error: errorMessage };
        } finally {
            // 👈 FIXED: Reset submission flag after delay
            setTimeout(() => {
                isSubmittingRef.current = false;
            }, 2000);
        }
    }, [validateField]);

    const resetStatus = useCallback(() => {
        setFormStatus({ type: 'idle', message: '' });
        setFieldErrors({});
        setRetryAfter(undefined);
    }, []);

    return {
        formStatus,
        fieldErrors,
        sendEmail,
        resetStatus,
        validateField,
        isLoading: formStatus.type === 'loading',
        retryAfter
    };
};
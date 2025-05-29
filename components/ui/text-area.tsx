import { FC, ReactNode, useState } from "react";

interface TextAreaProps {
    icon?: ReactNode;
    placeholder: string;
    name: string;
    required?: boolean;
    rows?: number;
    className?: string;
    disabled?: boolean;
    value?: string;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({
    icon,
    placeholder,
    name,
    required = false,
    rows = 5,
    className = "",
    disabled = false,
    value,
    maxLength,
    onChange,
    onFocus,
    onBlur
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setHasValue(newValue.length > 0);
        setCharCount(newValue.length);
        if (onChange) {
            onChange(e);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    return (
        <div className={`relative w-full ${className}`}>
            {/* Floating Label */}
            <label
                htmlFor={name}
                className={`
                    absolute left-10 transition-all duration-200 pointer-events-none z-10
                    ${isFocused || hasValue
                        ? 'top-3 text-xs text-blue-400 font-medium'
                        : 'top-6 text-sm text-secondary-foreground'
                    }
                `}
            >
                {placeholder}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* Icon */}
            {icon && (
                <div className={`
                    absolute top-6 left-3 pointer-events-none transition-colors duration-200
                    ${isFocused ? 'text-blue-400' : 'text-secondary-foreground'}
                `}>
                    {icon}
                </div>
            )}

            {/* TextArea Field */}
            <textarea
                name={name}
                id={name}
                rows={rows}
                required={required}
                disabled={disabled}
                value={value}
                maxLength={maxLength}
                className={`
                    w-full bg-primary-background text-primary-foreground rounded-lg text-sm
                    border border-border focus:border-blue-400/50 focus:outline-none
                    transition-all duration-200 resize-none
                    ${icon ? 'pl-10' : 'pl-4'} pr-4
                    ${isFocused || hasValue ? 'pt-8 pb-12' : 'pt-6 pb-4'}
                    hover:border-border/70 focus:ring-2 focus:ring-blue-400/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    font-size-16 // Prevents zoom on iOS
                `}
                style={{ fontSize: '16px' }} // Ensures no zoom on mobile
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="" // Hide default placeholder since we use floating label
            />

            {/* Focus ring */}
            <div className={`
                absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-200 pointer-events-none
                ${isFocused ? 'border-blue-400/30' : ''}
            `} />

            {/* Character count and guidelines */}
            <div className="absolute bottom-2 right-3 flex items-center gap-3 text-xs text-secondary-foreground/70">
                {maxLength && (
                    <span className={charCount > maxLength * 0.9 ? 'text-orange-400' : ''}>
                        {charCount}/{maxLength}
                    </span>
                )}
                <span>Min. 20 characters recommended</span>
            </div>
        </div>
    );
}

export default TextArea;
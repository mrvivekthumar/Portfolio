import { FC, ReactNode, useState } from "react";

interface InputProps {
    icon?: ReactNode;
    placeholder: string;
    type: "email" | "text" | "password" | "tel";
    name: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
    icon,
    placeholder,
    type,
    name,
    required = false,
    className = "",
    disabled = false,
    value,
    onChange,
    onFocus,
    onBlur
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        if (onChange) {
            onChange(e);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
                        ? 'top-2 text-xs text-blue-400 font-medium'
                        : 'top-1/2 -translate-y-1/2 text-sm text-secondary-foreground'
                    }
                `}
            >
                {placeholder}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {/* Icon */}
            {icon && (
                <div className={`
                    absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200
                    ${isFocused ? 'text-blue-400' : 'text-secondary-foreground'}
                `}>
                    {icon}
                </div>
            )}

            {/* Input Field */}
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                disabled={disabled}
                value={value}
                className={`
                    w-full bg-primary-background text-primary-foreground rounded-lg text-sm 
                    border border-border focus:border-blue-400/50 focus:outline-none
                    transition-all duration-200
                    ${icon ? 'pl-10' : 'pl-4'} pr-4 
                    ${isFocused || hasValue ? 'pt-6 pb-2' : 'py-4'}
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
        </div>
    );
}

export default Input;
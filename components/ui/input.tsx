import { assert } from "console";
import { FC, ReactNode } from "react";

interface InputPorps {
    icon?: ReactNode;
    placeholder: string;
    type: "email" | "text" | "password";
    name: string;
}

const Input: FC<InputPorps> = ({ icon, placeholder, type, name }) => {
    return (
        <div className="relative w-full">
            {/* Icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className="w-full bg-primary-background text-primary-foreground rounded-lg text-sm ps-10 px-2.5 py-4 focus:outline-none"
            />

        </div>)
}

export default Input;
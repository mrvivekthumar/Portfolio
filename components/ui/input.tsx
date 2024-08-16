import { assert } from "console";
import { FC } from "react";

interface InputPorps {
    icon?: string;
    placeholder: string;
    type: "email" | "text" | "password";
}

const Input: FC<InputPorps> = ({ icon, placeholder, type }) => {
    return (
        <div className="relative w-full">
            {/* Icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                {icon}
            </div>
            <input type={type} placeholder={placeholder} className="w-full bg-primary-background text-primary-foreground rounded-lg text-sm ps-10 px-2.5 py-4 focus:outline-none" />

        </div>)
}

export default Input;
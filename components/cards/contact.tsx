import { FC, ReactNode } from "react";
import Button from "../ui/button";

interface ContactCardProps {
    title: string;
    icon: ReactNode;
    text: string;
    btnText: string;
}

const ContactCard: FC<ContactCardProps> = ({ icon, title, text, btnText }) => {
    return (
        <div className="bg-primary-background border border-border rounded-lg relative overflow-hidden pt-5 pl-[25px] shadow-md">
            <div className="z-20 flex flex-col gap-8 justify-between items-start">
                {/* Header */}
                <div className="flex items-center gap-x-2 ">
                    <span className="bg-white w-8 h-8 rounded-lg grid place-items-center ">{icon} </span>
                    <h1>{title} </h1>
                </div>
                {/* Body Text */}
                <div className=" ">
                    <h2 className="font-bold text-2xl ">{text}</h2>
                </div>
                <Button className="w-24 ">{btnText} </Button>
            </div>
        </div>
    )
};

export default ContactCard;
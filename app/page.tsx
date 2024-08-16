"use client";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import FancyButton from "@/components/ui/fancy-button";
import Input from "@/components/ui/input";
import LiveClock from "@/components/ui/live-clock";
import Profile from "@/components/ui/profile";
import ScrollDown from "@/components/ui/scroll-down";
import TextArea from "@/components/ui/text-area";
import MagneticWrapper from "@/components/visualEffects/magnetic-wrapper";
import WaterWaveWrapper from "@/components/visualEffects/water-wave-wrapper";
import { FaArrowAltCircleRight, FaArrowRight, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";


export default function Home() {
    return (
        <WaterWaveWrapper
            imageUrl=""
            dropRadius="3"
            perturbance="2"
            resolution="2048"
        >
            {() =>
                <div className="w-full p-10">
                    <div className="max-w-2xl mx-auto">
                        <Card title="Ui Component">
                            <div className="grid grid-cols-4">
                                <Button><GoHomeFill />Basic Button</Button>
                                <Button><FaUser />User</Button>
                                <Button link="http://www.github.com/mrvivekthumar">Github</Button>
                            </div>
                            <Input type="text" placeholder="Full name" />
                            <TextArea placeholder="Full name" />
                            <Profile />
                            <MagneticWrapper className="w-[350px]">
                                <FancyButton text="Contact us" icon={<FaArrowRight />} />
                            </MagneticWrapper>
                            <LiveClock timeZone="Asia/India" />
                            <MagneticWrapper className="">
                                <ScrollDown />
                            </MagneticWrapper>
                        </Card>
                    </div>
                </div>}
        </WaterWaveWrapper>
    );
}

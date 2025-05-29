"use client";
import AboutSection from "@/sections/about";
import ContactSection from "@/sections/contact";
import FeaturedSection from "@/sections/featured";
import LandingSection from "@/sections/landing";
import CustomWaterWaveWrapper from "@/components/visualEffects/custom-water-wave-wrapper";

export default function Home() {
    return (
        <CustomWaterWaveWrapper>
            {() => (
                <div className="pb-8">
                    <LandingSection />
                    <FeaturedSection />
                    <AboutSection />
                    <ContactSection />
                </div>
            )}
        </CustomWaterWaveWrapper>
    );
}
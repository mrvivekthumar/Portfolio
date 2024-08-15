"use client";
import WaterWaveWrapper from "@/components/visualEffects/water-wave-wrapper";

export default function Home() {
    return (
        <WaterWaveWrapper
            imageUrl=""
            dropRadius="1"
            perturbance="2"
            resolution="2048"
        >
            {() => <div className="h-screen"></div>}
        </WaterWaveWrapper>
    );
}

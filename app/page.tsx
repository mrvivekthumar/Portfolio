import Hero from "@/component/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Hero />
    </div>
  );
}

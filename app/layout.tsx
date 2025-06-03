import type { Metadata } from "next";
import { Bricolage_Grotesque, Oswald } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import GrainEffect from "@/components/visualEffects/grain-effect";
import Cursor from "@/components/cursor/cursor";

// Fonts from google
const MainFont = Bricolage_Grotesque({ subsets: ["latin"] });

// i can also many fonts from google in my app
const OswalFont = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
// Now i can --font-oswald variable in my application


// Now How can i use the local font from assets folder
const PixelFont = localFont({
    src: "../public/assets/fonts/pixel-font-7.ttf",
    variable: "--font-pixel"
});


// Metadata
export const metadata: Metadata = {
    title: "Vivek Thumar - Full Stack Developer",
    description: "IT Student & Full-Stack Developer specializing in React, Next.js, and modern web technologies",
    keywords: "Full Stack Developer, React, Next.js, IT Student, Web Development",
    openGraph: {
        title: "Vivek Thumar - Full Stack Developer",
        description: "Building innovative web solutions with modern technologies",
        images: [{ url: "/assets/images/me/IMG.jpg" }]
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Normal font from app */}
            {/* <body className={MainFont.className}>{children}</body> */}

            {/* we have to use here oswald font as a variable so ,in the body so all our children can use that  and also that we have to specify in our taiwindcss configuration fontFmaily*/}
            {/* <body className={cn(MainFont.className, OswalFont.variable)}>{children}</body> */}

            {/* Using Local font form assets folder */}
            <body className={cn(MainFont.className, OswalFont.variable, PixelFont.variable)}>
                <GrainEffect />
                <Cursor color="#fff" />
                {children}
            </body>

        </html>
    );
}

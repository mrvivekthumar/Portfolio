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
    title: "VIVEK THUMAR",
    description: "This is Vivek Thumar official Portfolio",
};

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

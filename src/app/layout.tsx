import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baby Jeeshika | Ear Piercing Ceremony (செவிப்பொன் சேர்ப்பு விழா)",
  description: "அன்புடன் அழைக்கின்றோம் - எங்கள் அன்பு மகள் பேபி. ஜீஷிகாவின் செவிப்பொன் சேர்ப்பு விழா (Baby Jeeshika Ear Piercing Ceremony) சுபமுகூர்த்த அழைப்பிதழ்.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#6B1D2F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wdth,wght@100..125,700;100..125,800&family=Anek+Tamil:wght@700;800&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FAF3F5] text-gray-800 selection:bg-[#E8B7C4] selection:text-[#521120]">
        {children}
      </body>
    </html>
  );
}

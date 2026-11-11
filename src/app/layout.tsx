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
      <body className="antialiased bg-[#0d040a] text-gray-800 selection:bg-[#E8B7C4] selection:text-[#521120]">
        {children}
      </body>
    </html>
  );
}

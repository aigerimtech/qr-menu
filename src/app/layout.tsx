import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navBar";
import "./globals.css";
import { raleway } from "@/fonts/raleway";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={raleway.variable}>
      {/* Define navbar height as a CSS variable once */}
      <body className="bg-[#060606] [--nav-h:100px]">
        <Navbar />

        {/* Spacer: only visible on md+ so content isn’t covered by fixed navbar */}
        <div aria-hidden className="hidden md:block h-[var(--nav-h)]" />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}

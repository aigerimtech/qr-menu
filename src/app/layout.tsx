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
      {/* Резерв под фикс-навигацию — через padding-top и переменную */}
      <body className="bg-[#060606] md:pt-[var(--nav-h)]">
        <Navbar />


        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navBar";
import "./globals.css";
import { raleway } from "@/fonts/raleway";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={raleway.variable}>
      <body className="bg-[#060606]">  
        <div className="hidden md:block">
          <Navbar />
        </div>

        <main className="pt-0 md:pt-[102px]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-4 left-4 right-4 z-50">
      <div
        className="bg-[#FEFEFF] rounded-[1000px] shadow-lg backdrop-blur-sm border border-gray-100/20"
        style={{
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.05)",
          padding: "16px 32px 16px 16px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <Image
                src="/img/black_logo.png"
                alt="nilGPT Logo"
                width={24}
                height={24}
              />
              <div className="font-display font-extra-bold text-2xl text-black">
                nilGPT
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-10">
              <a
                href="#testimonials"
                className="font-medium text-gray-600 hover:text-black transition-colors text-lg"
              >
                Who is it for?
              </a>
              <a
                href="#features"
                className="font-medium text-gray-600 hover:text-black transition-colors text-lg"
              >
                Features
              </a>
              <a
                href="#faq"
                className="font-medium text-gray-600 hover:text-black transition-colors text-lg"
              >
                FAQ
              </a>
            </nav>
          </div>

          <Link
            href="/app"
            data-umami-event="Go To App Clicked"
            className="bg-[#F7F6F2] text-black px-4 py-2 font-medium text-lg rounded-full hover:bg-[#F0EFE9] transition-colors flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            Go to app
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

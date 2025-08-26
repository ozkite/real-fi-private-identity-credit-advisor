"use client";

import Footer from "@/components/landingPage/Footer";
import FAQSection from "../components/landingPage/FAQSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import Header from "../components/landingPage/Header";
import HeroSection from "../components/landingPage/HeroSection";
import TestimonialSection from "../components/landingPage/TestimonialSection";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <TestimonialSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}

"use client";

import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { CaseStudies } from "@/components/case-studies";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { FAQ } from "@/components/faq";
import { AiArticles } from "@/components/ai-articles";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-white text-gray-800"
      style={{
        fontFamily:
          "'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      }}
    >
      <Header />
      <Hero />
      <Features />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <AiArticles />
      <Footer />
    </div>
  );
}

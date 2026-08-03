import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { EmergencyBanner } from "@/components/home/EmergencyBanner";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ServiceAreaTeaser } from "@/components/home/ServiceAreaTeaser";
import { ReviewsCta } from "@/components/home/ReviewsCta";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Licensed Electrician in Lynn, MA & the North Shore`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <EmergencyBanner />
      <ProcessSteps />
      <ServiceAreaTeaser />
      <ReviewsCta />
      <FinalCta />
    </>
  );
}

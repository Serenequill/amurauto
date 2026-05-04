import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import BranchesSection from "@/components/BranchesSection";
import PddTrainer from "@/components/PddTrainer";
import Pricing from "@/components/Pricing";
import Installments from "@/components/Installments";
import About from "@/components/About";
import Awards from "@/components/Awards";
import TrustBar from "@/components/TrustBar";
import Teachers from "@/components/Teachers";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import RegistrationForm from "@/components/RegistrationForm";
import GroupsSection from "@/components/GroupsSection";
import RoadDivider from "@/components/RoadDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <RoadDivider />
      <PddTrainer />
      <RoadDivider />
      <BranchesSection />
      <RoadDivider />
      <Pricing />
      <RoadDivider />
      <Installments />
      <RoadDivider />
      <About />
      <RoadDivider />
      <Awards />
      <TrustBar />
      <RoadDivider />
      <Teachers />
      <RoadDivider />
      <Reviews />
      <RoadDivider />
      <FAQ />
      <RoadDivider />
      <GroupsSection />
      <RoadDivider />
      <RegistrationForm />
    </>
  );
}

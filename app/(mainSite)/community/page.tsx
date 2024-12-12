import { CommunityCTA } from "@/components/sections/community/community-cta";
import { CommunityFeatures } from "@/components/sections/community/community-features";
import { CommunityHero } from "@/components/sections/community/community-hero";
import { CommunityResources } from "@/components/sections/community/community-resources";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join our vibrant community to learn, share, and grow together.",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CommunityHero />
      <CommunityFeatures />
      <CommunityResources />
      <CommunityCTA />
    </div>
  );
}

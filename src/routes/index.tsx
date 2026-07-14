import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/scorpion/Navigation";
import { Hero } from "@/components/scorpion/Hero";
import { About } from "@/components/scorpion/About";
import { Team } from "@/components/scorpion/Team";
import { Scrim } from "@/components/scorpion/Scrim";
import { Events } from "@/components/scorpion/Events";
import { Media } from "@/components/scorpion/Media";
import { ApplyForm } from "@/components/scorpion/ApplyForm";
import { Social } from "@/components/scorpion/Social";
import { Footer } from "@/components/scorpion/Footer";
import { Reveal } from "@/components/scorpion/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal delay={60}><Team /></Reveal>
        <Reveal delay={60}><Scrim /></Reveal>
        <Reveal delay={60}><Events /></Reveal>
        <Reveal delay={60}><Media /></Reveal>
        <Reveal delay={60}><ApplyForm /></Reveal>
        <Reveal delay={60}><Social /></Reveal>
      </main>
      <Footer />
    </div>
  );
}

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

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Team />
        <Scrim />
        <Events />
        <Media />
        <ApplyForm />
        <Social />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { navItems } from "@/data";

import Hero from "@/components/hero";
import Grid from "@/components/grid";
import Footer from "@/components/footer";
import Clients from "@/components/clients";
import Approach from "@/components/approach";
import Experience from "@/components/experience";
import RecentProjects from "@/components/recent-projects";
import { FloatingNav } from "@/components/ui/floating-navbar";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;

import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Packages from '@/components/sections/Packages';
import SpeedComparison from '@/components/sections/SpeedComparison';
import CoverageArea from '@/components/sections/CoverageArea';
import AboutUs from '@/components/sections/AboutUs';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import CallToAction from '@/components/sections/CallToAction';
import { useEffect } from 'react';

const Home = () => {
  // Scroll to section if URL has a hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <Packages />
      <SpeedComparison />
      <CoverageArea />
      <AboutUs />
      <FAQ />
      <Contact />
      <CallToAction />
    </div>
  );
};

export default Home;

import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Testimonials } from '../components/Testimonials';
import { Cta } from '../components/Cta';

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <Cta />
    </>
  );
}
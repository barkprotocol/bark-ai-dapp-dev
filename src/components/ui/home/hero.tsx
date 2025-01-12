'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import BlurFade from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { usePrivy } from '@privy-io/react-auth';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const productRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: productRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  const { login } = usePrivy();
  const router = useRouter();
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    // Initialize Solana connection
    const newConnection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    setConnection(newConnection);
  }, []);

  const handleLogin = async () => {
    try {
      // Log in using Privy
      await login();
      // After successful login, route to the next page
      router.push('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <section
      className="relative pt-[5.75rem] bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://ucarecdn.com/039f023e-bd03-4004-9bec-c29afc145f50/barkhead.png")',
      }}
      ref={productRef}
    >
      <div className="relative mx-auto max-w-screen-xl px-6 pb-6 pt-12 text-center md:pb-8 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.3} className="pointer-events-none select-none">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-muted/80 px-4 py-1.5 shadow-lg backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">
                ✨ Introducing BARK AI Agent
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              The{' '}
              <AnimatedShinyText className="inline">
                <span>Intelligent Copilot</span>
              </AnimatedShinyText>{' '}
              for <span>Solana</span>
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Enhance your Solana experience with AI-driven insights and
              automated actions.
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8">
              <Button
                onClick={handleLogin}
                className="h-12 min-w-[180px] text-base transition-all duration-300 hover:scale-105"
                aria-label="Get started with BARK AI Agent"
              >
                Getting Started
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Product Preview */}
      <div className="relative w-full">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            rotateX,
            scale,
            opacity,
            transformPerspective: 1000,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 20,
            delay: 0.5,
          }}
          className="relative mx-auto w-full max-w-[1200px] will-change-transform"
        >
          <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
            {/* Image based on light or dark theme */}
            <div className="relative dark:hidden">
              <Image
                src="/product.png"
                alt="BARK AI Interface showcasing AI-driven insights and actions for the Solana blockchain in a light theme"
                layout="responsive"
                width={1200}
                height={675}
                className="w-full rounded-2xl"
                priority
              />
            </div>
            <div className="relative hidden dark:block">
              <Image
                src="/product_dark.png"
                alt="BARK AI Interface showcasing AI-driven insights and actions for the Solana blockchain in a dark theme"
                layout="responsive"
                width={1200}
                height={675}
                className="w-full rounded-2xl"
                priority
              />
            </div>
            <BorderBeam
              className="opacity-0 group-hover:opacity-100"
              duration={10}
              size={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
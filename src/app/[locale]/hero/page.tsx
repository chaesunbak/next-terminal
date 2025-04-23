"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import { ArrowRight, BarChart4, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HeroPage() {
  const t = useTranslations();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const featureOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const featureY = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);

  const demoOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const demoScale = useTransform(scrollYProgress, [0.5, 0.7], [0.8, 1]);

  const FeatureCard = ({
    icon: Icon,
    title,
    description,
    delay,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      className="border-border/50 bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm"
    >
      <Icon className="text-primary h-8 w-8" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen flex-col" ref={containerRef}>
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale, y }}
        className="from-background to-background/90 relative flex h-screen flex-col items-center justify-center bg-gradient-to-b px-6 text-center"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]" />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          <span className="text-primary">Next</span> Terminal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground mt-6 max-w-3xl text-xl"
        >
          {t("Index.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/app">
              {t("Index.viewDashboard")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">{t("Index.exploreFeatures")}</Link>
          </Button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10"
        >
          <ArrowRight className="text-muted-foreground/70 h-6 w-6 rotate-90" />
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        style={{ opacity: featureOpacity, y: featureY }}
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            {t("Features.title")}
          </h2>
          <p className="text-muted-foreground mt-4 text-xl">
            {t("Features.subtitle")}
          </p>
        </div>

        <div className="grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={BarChart4}
            title={t("Features.realTimeData.title")}
            description={t("Features.realTimeData.description")}
            delay={0.1}
          />
          <FeatureCard
            icon={MessageSquare}
            title={t("Features.chatbotAssistant.title")}
            description={t("Features.chatbotAssistant.description")}
            delay={0.2}
          />
          <FeatureCard
            icon={ArrowRight}
            title={t("Features.customDashboard.title")}
            description={t("Features.customDashboard.description")}
            delay={0.3}
          />
        </div>
      </motion.section>

      {/* Demo Section */}
      <motion.section
        style={{ opacity: demoOpacity, scale: demoScale }}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            {t("Demo.title")}
          </h2>
          <p className="text-muted-foreground mt-4 text-xl">
            {t("Demo.subtitle")}
          </p>
        </motion.div>

        <div className="border-border relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border shadow-2xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-card relative aspect-video w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-full w-full flex-col">
                <div className="bg-muted/50 flex h-10 w-full items-center border-b px-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="flex flex-1 overflow-hidden">
                  <div className="w-2/3 border-r p-4">
                    <div className="grid h-full grid-cols-2 gap-4">
                      <div className="bg-card rounded-lg border p-2">
                        <div className="bg-muted mb-2 h-4 w-1/2 rounded" />
                        <div className="bg-muted/50 h-32 w-full rounded" />
                      </div>
                      <div className="bg-card rounded-lg border p-2">
                        <div className="bg-muted mb-2 h-4 w-1/2 rounded" />
                        <div className="bg-muted/50 h-32 w-full rounded" />
                      </div>
                      <div className="bg-card rounded-lg border p-2">
                        <div className="bg-muted mb-2 h-4 w-1/2 rounded" />
                        <div className="bg-muted/50 h-32 w-full rounded" />
                      </div>
                      <div className="bg-card rounded-lg border p-2">
                        <div className="bg-muted mb-2 h-4 w-1/2 rounded" />
                        <div className="bg-muted/50 h-32 w-full rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 p-4">
                    <div className="bg-card flex h-full flex-col rounded-lg border p-3">
                      <div className="bg-muted mb-3 h-4 w-1/2 rounded" />
                      <div className="bg-muted/50 mb-2 h-3 w-3/4 rounded" />
                      <div className="bg-muted/50 mb-2 h-3 w-full rounded" />
                      <div className="bg-muted/50 mb-2 h-3 w-2/3 rounded" />
                      <div className="bg-muted/50 mb-4 h-3 w-3/4 rounded" />
                      <div className="mt-auto">
                        <div className="bg-primary/20 h-8 w-full rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/app">
              {t("Demo.getStarted")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
}

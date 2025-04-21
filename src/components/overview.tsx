import { motion } from "motion/react";
import { Bot } from "lucide-react";

import { cn } from "@/lib/utils";
import { H1 } from "./ui/typography";

interface OverviewProps {
  className?: string;
}

export const Overview = ({ className }: OverviewProps) => {
  return (
    <motion.div
      key="overview"
      className={cn("flex items-center gap-2 md:mt-20", className)}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <Bot className="h-14 w-14" />
      <H1>Next Terminal</H1>
    </motion.div>
  );
};

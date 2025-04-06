import { motion } from "motion/react";
import { Bot } from "lucide-react";

import { H1 } from "./ui/typography";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="mx-auto max-w-3xl md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex max-w-xl items-center gap-2 rounded-xl p-6 text-center leading-relaxed">
        <Bot className="mx-auto h-16 w-16" />
        <H1>OLLAMA CHATBOT</H1>
      </div>
    </motion.div>
  );
};

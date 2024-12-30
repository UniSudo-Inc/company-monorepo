import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import "@/i18n";

export function FAQ() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqItems = t("faq.items", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#217346]">
          {t("faq.title")}
        </h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative overflow-hidden bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full justify-between text-left px-4 py-5"
              >
                <span className="text-lg font-medium text-gray-700 group-hover:text-[#217346] transition-colors duration-300">
                  {item.question}
                </span>
                {hoveredIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-[#217346]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-[#217346]" />
                )}
              </Button>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gray-50 rounded-b-lg shadow-inner"
                >
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Shield, Zap, Smile } from "lucide-react";
import { useTranslation } from "react-i18next";

const featureIcons = [Gift, Shield, Zap, Smile];

export function Features() {
  const { t } = useTranslation();

  const features = featureIcons.map((icon, i) => ({
    id: i,
    icon: icon,
    title: t(`features.items.${i}.title`),
    description: t(`features.items.${i}.description`),
  }));

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#217346]">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.id * 0.1 }}
            >
              <Card className="h-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <feature.icon className="h-8 w-8 text-[#217346] mb-2" />
                  <h3 className="text-lg font-semibold mb-1 text-[#217346]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function Pricing() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#217346]">
          {t("pricing.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "basic", features: ["feature1", "feature2", "feature3"] },
            {
              name: "standard",
              features: ["feature1", "feature2", "feature3"],
            },
            {
              name: "enterprise",
              features: [
                "feature1",
                "feature2",
                "feature3",
                "feature4",
                "feature5",
              ],
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-semibold mb-2 text-[#217346]">
                    {t(`pricing.${plan.name}.name`)}
                  </h3>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-gray-800">
                      {t(`pricing.${plan.name}.price`)}
                    </p>
                    {plan.name === "standard" && (
                      <p className="text-lg text-gray-500 line-through">
                        {t(`pricing.${plan.name}.originalPrice`)}
                      </p>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 text-sm"
                      >
                        <Check className="h-5 w-5 mr-2 text-[#217346]" />
                        {t(`pricing.${plan.name}.${feature}`)}
                      </li>
                    ))}
                  </ul>
                  {plan.name === "enterprise" ? (
                    <a
                      href={`mailto:datai@limit.dev?subject=${encodeURIComponent(t("pricing.enterprise.emailSubject"))}&body=${encodeURIComponent(t("pricing.enterprise.emailBody"))}`}
                      className="w-full bg-[#217346] text-white hover:bg-[#1e6b3e] mt-auto py-2 px-4 rounded text-center text-base"
                    >
                      {t("pricing.enterprise.contactUs")}
                    </a>
                  ) : (
                    <a
                      href="https://datai.limit.dev/"
                      className="w-full bg-[#217346] text-white hover:bg-[#1e6b3e] mt-auto py-2 px-4 rounded text-center text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.name === "basic"
                        ? t("pricing.basic.cta")
                        : t("pricing.standard.cta")}
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

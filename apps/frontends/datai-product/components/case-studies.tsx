import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const caseStudies = [
  { id: 1, titleKey: "caseStudies.finance", url: "/videos/finance.mp4" },
  { id: 2, titleKey: "caseStudies.healthcare", url: "/videos/healthcare.mp4" },
  { id: 3, titleKey: "caseStudies.education", url: "/videos/education.mp4" },
  { id: 4, titleKey: "caseStudies.retail", url: "/videos/retail.mp4" },
];

export function CaseStudies() {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState(caseStudies[0]);

  return (
    <section id="cases" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#217346]">
          {t("caseStudies.title")}
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg"
            >
              <video
                key={selectedCase.url}
                src={selectedCase.url}
                className="w-full h-full object-cover"
                controls
              >
                {t("caseStudies.videoNotSupported")}
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-[#217346] text-white hover:bg-[#1e6b3e]"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-semibold mb-4 text-[#217346]">
              {t("caseStudies.selectCase")}
            </h3>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  setSelectedCase({
                    id: 0,
                    titleKey: "caseStudies.productIntro",
                    url: "/videos/introduction.mp4",
                  })
                }
              >
                {t("caseStudies.productIntro")}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  setSelectedCase({
                    id: -1,
                    titleKey: "caseStudies.quickStart",
                    url: "/videos/quickstart.mp4",
                  })
                }
              >
                {t("caseStudies.quickStart")}
              </Button>
              <Select
                onValueChange={(value) =>
                  setSelectedCase(
                    caseStudies.find((cs) => cs.id.toString() === value) ||
                      caseStudies[0],
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("caseStudies.selectPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  {caseStudies.map((cs) => (
                    <SelectItem key={cs.id} value={cs.id.toString()}>
                      {t(cs.titleKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

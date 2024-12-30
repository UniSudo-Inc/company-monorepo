import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import "@/i18n";

export function AiArticles() {
  const router = useRouter();
  const { t } = useTranslation();
  const aiArticles = t("aiArticles.items", { returnObjects: true }) as Array<{
    title: string;
    content: string;
    href: string;
  }>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#217346]">
          {t("aiArticles.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2 text-[#217346]">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">{article.content}</p>
                  <Button
                    variant="outline"
                    className="mt-4 text-[#217346] hover:bg-[#217346] hover:text-white"
                    onClick={() => router.push(article.href)}
                  >
                    {t("aiArticles.readMore")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

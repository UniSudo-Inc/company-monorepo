import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <p className="text-gray-600">{t("footer.allRightsReserved")}</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-[#217346] transition-colors"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-[#217346] transition-colors"
            >
              {t("footer.termsOfService")}
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-6 mb-4">
          <span className="text-gray-600">{t("footer.contactUs")}</span>
          <a
            href="mailto:contact@unisudo.com"
            className="text-gray-400 hover:text-[#217346] flex items-center"
          >
            <Mail size={24} className="mr-2" />
            contact@unisudo.com
          </a>
        </div>
        <div className="text-center text-gray-500 text-sm">
          <p>{t("footer.icpRecord")}</p>
          <p>{t("footer.publicSecurityRecord")}</p>
        </div>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const languages = [
  { code: "zh", name: "中文" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "ja", name: "日本語" },
];

interface NavItem {
  title: string;
  href: string;
  items?: { title: string; href: string }[];
}

export function Header() {
  const { t, i18n } = useTranslation();
  // const [currentLanguage, setCurrentLanguage] = useState(
  //   languages.find((lang) => lang.code === i18n.language) || languages[0],
  // );
  const [fontSize, setFontSize] = useState("1rem");

  useEffect(() => {
    if (i18n.language === "ja") {
      setFontSize("0.9rem");
    } else {
      setFontSize("1rem");
    }
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // setCurrentLanguage(
    //   languages.find((lang) => lang.code === lng) || languages[0],
    // );
  };

  const navItems: NavItem[] = [
    { title: t("nav.userManual"), href: "/manual" },
    { title: t("nav.companyHomepage"), href: "https://www.unisudo.com" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={"/assets/icon.png"}
            alt="logo"
            height={20}
            width={20}
          ></Image>
          <p className="text-2xl font-bold text-[#217346] pt-1.5">DatAI</p>
        </div>
        <div className="hidden md:flex flex-wrap items-center space-x-4">
          {navItems.map((item) =>
            item.items ? (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger
                  className="text-gray-600 hover:text-[#217346] transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize, minWidth: "100px", maxWidth: "150px" }}
                >
                  {item.title}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.title}>
                      {subItem.href.startsWith("mailto:") ? (
                        <a
                          href={subItem.href}
                          className="w-full whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{ fontSize }}
                        >
                          {subItem.title}
                        </a>
                      ) : (
                        <Link
                          href={subItem.href}
                          className="w-full whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{ fontSize }}
                        >
                          {subItem.title}
                        </Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                className="text-gray-600 hover:text-[#217346] transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontSize, minWidth: "100px", maxWidth: "150px" }}
              >
                {item.title}
              </Link>
            ),
          )}
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="text-[#217346]" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

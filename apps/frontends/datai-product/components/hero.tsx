"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n";

interface Particle {
  id: number;
  x: number;
  y: number;
  value: number;
  speedX: number;
  speedY: number;
}

export function Hero() {
  const [particles, setParticles] = useState([] as Particle[]);
  const controls = useAnimation();
  const router = useRouter();
  const { t } = useTranslation(); // 正确解构 t 函数

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          value: Math.floor(Math.random() * 10),
          speedX: (Math.random() - 0.5) * 10,
          speedY: (Math.random() - 0.5) * 10,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x:
            (particle.x + particle.speedX + window.innerWidth) %
            window.innerWidth,
          y:
            (particle.y + particle.speedY + window.innerHeight) %
            window.innerHeight,
        })),
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [controls]);

  const handleStartClick = () => {
    router.push("https://datai.unisudo.dev");
  };

  return (
    <section
      className="pt-32 pb-16 flex items-center justify-center text-center relative overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-[#217346] font-bold"
            style={{
              left: particle.x,
              top: particle.y,
              fontSize: "24px",
            }}
            animate={{
              x: particle.x + particle.speedX * 10,
              y: particle.y + particle.speedY * 10,
              opacity: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {particle.value}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="z-10"
      >
        <motion.h1
          className="text-6xl font-bold mb-6 text-[#217346]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          className="text-2xl mb-8 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          {t("hero.subtitle")
            .split("")
            .map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
              >
                {char}
              </motion.span>
            ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 3.5 }}
        >
          <Button
            size="lg"
            className="bg-[#217346] text-white hover:bg-[#1e6b3e]"
            onClick={handleStartClick}
          >
            {t("hero.startButton")}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

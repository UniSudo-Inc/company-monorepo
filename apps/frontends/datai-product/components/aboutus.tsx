import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#217346]">
          关于我们
        </h2>
        <Card>
          <CardContent className="p-6">
            <p>这里是关于我们的详细介绍...</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

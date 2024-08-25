"use client";
import FormSearchCity from "@/components/FormSearchCity";
import WeatherOfCity from "@/components/WeatherOfCity";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <FormSearchCity />
      <WeatherOfCity />
    </main>
  );
}

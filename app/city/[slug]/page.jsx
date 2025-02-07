"use client";
import CityComponent from "@/components/cityComponent";
import { notFound, useSearchParams } from "next/navigation";

export default function CityPage({ params }) {
  const searchParams = useSearchParams();
  const cityName = params.slug;
  const city = searchParams.get("city"); // Default to slug if missing
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const country = searchParams.get("country").toLocaleLowerCase();
  if (!cityName) {
    notFound();
  }

  return <CityComponent city={city} lat={lat} lon={lon} country={country} />;
}

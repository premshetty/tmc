"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultData } from "@/lib/data";
import { PlaneTakeoff, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const [images, setImages] = useState({}); // Store fetched images

  useEffect(() => {
    async function fetchImages() {
      const newImages = {};
      await Promise.all(
        defaultData.map(async ({ city }) => {
          try {
            const response = await fetch(
              `https://en.wikipedia.org/w/api.php?action=query&pithumbsize=250&prop=pageimages&titles=${encodeURIComponent(
                city
              )}&format=json&origin=*`
            );
            const data = await response.json();
            const pages = data?.query?.pages;

            for (const key in pages) {
              newImages[city] = pages[key]?.thumbnail?.source || null;
            }
          } catch (error) {
            console.error(`Error fetching image for ${city}:`, error);
            newImages[city] = null;
          }
        })
      );
      setImages(newImages);
    }

    fetchImages();
  }, [defaultData]);
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
            alt="Travel background"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Discover Your Next Adventure
            </h1>
            <p className="mb-10 text-lg text-gray-300 sm:text-xl">
              Explore cities worldwide with real-time weather updates, local
              attractions, and comprehensive travel information.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="relative w-full max-w-md">
                <Input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search for a city..."
                  className="h-12 pl-12 pr-4"
                />
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
              <Button
                onClick={() => {
                  router.push(`/explore?query=${encodeURIComponent(query)}`);
                  setQuery("");
                }}
                size="lg"
                className="w-full sm:w-auto"
              >
                <PlaneTakeoff className="mr-2 h-5 w-5" />
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Popular Destinations
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {defaultData.map(({ city, country, lat, lon, places }) => {
            return (
              <Link
                key={city}
                href={`/city/Mumbai?city=${city}&lat=${lat}&lon=${lon}6&country=${country}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/3]">
                  <Image
                    loading="lazy"
                    src={images?.[city] || "/default-placeholder.jpg"} // Use default image if fetch fails
                    alt={city}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{city}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

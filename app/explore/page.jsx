"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const routerQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(routerQuery);
  const [results, setResults] = useState([]);

  const handleNavigation = (city, lat, lon, country) => {
    console.log({
      city,
      lat,
      lon,
      country,
    });

    router.push(
      `/city/${city}?city=${city}&lat=${lat}&lon=${lon}&country=${country}`
    );
  };
  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setQuery("");
      return;
    }

    setQuery(searchQuery);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          searchQuery
        )}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      setResults(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  }, []);

  useEffect(() => {
    if (routerQuery) {
      handleSearch(routerQuery);
    }
  }, [routerQuery, handleSearch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Explore Cities</h1>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            value={query}
            type="text"
            placeholder="Search for a city..."
            className="h-12 pl-12 pr-4"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <div
              onClick={() =>
                handleNavigation(
                  result.name,
                  result.lat,
                  result.lon,
                  result.country
                )
              }
              className="rounded-lg border bg-card p-6 hover:bg-gray-700 transition"
              key={index}
            >
              <button type="button" className="inline-flex w-full px-4 py-2">
                {`${result.name ?? ""}, ${
                  result.state ? result.state + ", " : ""
                }${result.country ?? ""}`}
              </button>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="rounded-lg border bg-card p-6">
          <p className="text-lg font-medium">
            No city found for the query: {query}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-6 max-w-md">
          <p className="text-lg font-medium">
            Start by searching for a city above
          </p>
          <p className="text-sm text-muted-foreground">
            You&apos;ll see weather information, attractions, and more
          </p>
        </div>
      )}
    </div>
  );
}

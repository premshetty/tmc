"use client";
import { useSavedCities } from "@/context/savedCitiesContext";
import Link from "next/link";
import { Button } from "./ui/button";

const DashBoardList = () => {
  const { savedCities, removeCity } = useSavedCities();

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-center mt-3">DashBoard</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 sm:px-4">
        {savedCities.length > 0 ? (
          savedCities.map((city) => {
            console.log(city);
            
            const { lat, lon, country } = city;
            return (
              <div key={city.city} className="container mx-auto px-4 py-8">
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-medium">
                    {city.city}, {city.country}
                  </h2>
                  <ul className="mt-2 text-sm text-muted-foreground">
                    {city.places.length > 0 ? (
                      city.places.map((place, index) => (
                        <li key={index}>
                          {place.name} ({place.category})
                        </li>
                      ))
                    ) : (
                      <p>No places found for this city.</p>
                    )}
                  </ul>
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => removeCity(city.city)}
                      variant="danger"
                      type="button"
                      className="mt-4 px-4 py-2 bg-red-500  text-white rounded-md"
                    >
                      Remove City
                    </Button>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                      <Link
                        href={`/city/Mumbai?city=${city.city}&lat=${lat}&lon=${lon}6&country=${country}`}
                      >
                        View City
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Your Travel Dashboard</h1>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-lg font-medium">No saved cities yet</p>
              <p className="text-sm text-muted-foreground">
                Your saved destinations will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoardList;

"use client";
import { useSavedCities } from "@/context/SavedCitiesContext";
import axios from "axios";
import { Cloud, Droplets, MapPin, Save, Trash, Wind } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CountryCard from "./CountryCard";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
const CityComponent = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city"); // Default to slug if missing
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const country = searchParams.get("country").toLocaleLowerCase();

  const [weather, setWeather] = useState(null);
  const [places, setPlaces] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [placeImages, setPlaceImages] = useState({});
  const [cityImage, setCityImage] = useState(null);

  // Avoid fetching the same data again
  const fetchedCityImage = useRef(null);
  const fetchedWeather = useRef(false);

  const fetchCityImage = useCallback(async (query) => {
    if (fetchedCityImage.current === query) return; // Prevent re-fetching
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&pithumbsize=500&prop=pageimages&titles=${encodeURIComponent(
          query
        )}&format=json&origin=*`
      );

      const pages = response.data?.query?.pages;
      const imageUrl =
        pages && Object.values(pages)[0]?.thumbnail?.source
          ? Object.values(pages)[0].thumbnail.source
          : null;

      fetchedCityImage.current = query;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image for:", query, error);
    }
  }, []);

  const fetchWeatherData = useCallback(async () => {
    if (fetchedWeather.current) return; // Prevent re-fetching
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      setWeather(weatherRes.data);
      fetchedWeather.current = true;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [lat, lon]);

  const fetchPlaces = useCallback(async () => {
    try {
      const placesRes = await axios.get(
        "https://api.foursquare.com/v3/places/search",
        {
          params: {
            ll: `${lat},${lon}`,
            categories: "16000", // Tourist attractions
            limit: 5,
          },
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
          },
        }
      );

      const placesData = placesRes.data.results || [];
      setPlaces(placesData);

      // Fetch images for places
      const imagePromises = placesData.map(async (place) => {
        return { [place.name]: await fetchCityImage(place.name) };
      });

      const imagesArray = await Promise.all(imagePromises);
      setPlaceImages(Object.assign({}, ...imagesArray));
      const cityImage = await fetchCityImage(city);

      setCityImage(cityImage);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }, [city]);

  const fetchCountry = useCallback(async () => {
    try {
      const countryRes = await axios.get(
        `https://restcountries.com/v3.1/alpha/${encodeURIComponent(
          country.toUpperCase()
        )}`
      );

      setCountryData(countryRes.data[0]);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  }, [country]);

  useEffect(() => {
    if (city && lat && lon && country) {
      fetchWeatherData();
      fetchPlaces();
      fetchCountry();
      fetchCityImage(city);
    }
  }, [city]);

  const weatherContent = useMemo(() => {
    if (!weather) return <p>Loading weather...</p>;

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-muted-foreground" />
          <span>{weather.weather[0]?.description || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-muted-foreground" />
          <span>{weather.wind?.speed || "N/A"} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-muted-foreground" />
          <span>{weather.main?.humidity || "N/A"}% Humidity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {weather.main?.temp || "N/A"}°C
          </span>
        </div>
      </div>
    );
  }, [weather]);
  const { savedCities, addCity, removeCity } = useSavedCities();
  const isSaved = savedCities.some(
    (a) =>
      a.city.toLowerCase() ===
      (typeof city === "string" ? city.toLowerCase() : "")
  );
  const handleClick = () => {
    if (typeof city === "string") {
      if (!isSaved) {
        if (
          typeof country === "string" &&
          typeof lat === "string" &&
          typeof lon === "string"
        ) {
          addCity({
            city,
            country,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            places,
          });
        }
      } else {
        removeCity(city);
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      <Button
        onClick={handleClick}
        variant="ghost"
        className="absolute top-10 right-10 bg-gray-700 z-50"
        size="default"
      >
        {isSaved ? <Trash className="h-5 w-5" /> : <Save className="h-5 w-5" />}
        {isSaved ? "Delete" : "Save"} City
      </Button>
      {/* City Hero Image */}

      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={
            cityImage || `https://source.unsplash.com/featured/?${city},city`
          }
          alt={`Scenic view of ${city}`}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center shadow-lg shadow-black">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{city}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Weather Section */}

          {/* Places Section */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Popular Places</h2>
            {places.length > 0 ? (
              <div className="space-y-4">
                {places.map((place, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h3 className="font-medium">{place.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {place.location?.formatted_address ||
                          "No address available"}
                      </p>
                      {placeImages[place.name] && (
                        <Image
                          src={placeImages[place.name]}
                          alt={place.name}
                          width={100}
                          height={100}
                          className="rounded-md mt-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No places found.</p>
            )}
          </div>
          <div className="rounded-lg border bg-card p-6">
            <CountryCard countryData={countryData} />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
            {weatherContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityComponent;

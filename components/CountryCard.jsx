"use client";

import { Clock, Currency, Globe, MapPin, Ruler, Users } from "lucide-react";
import Image from "next/image";

const CountryCard = ({ countryData }) => {
  if (!countryData) return;
  return (
    <div className=" flex flex-col w-fit items-center justify-center ">
      <div className="p-6">
        <Image
          src={countryData.flags.png}
          alt={countryData.name.common}
          width={200}
          height={150}
          className="object-cover w-full md:w-48"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold ">
          {countryData.name.common} ({countryData.cca3})
        </h2>
        <p className=" text-sm mt-1">{countryData.name.official}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>Capital: {countryData.capital[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 " />
            <span>
              Region: {countryData.region}, {countryData.subregion}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 " />
            <span>Population: {countryData.population.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 " />
            <span>Area: {countryData.area.toLocaleString()} km²</span>
          </div>
          <div className="flex items-center gap-2">
            <Currency className="h-5 w-5 " />
            <span>
              Currency: {Object.values(countryData.currencies)[0].name} (
              {Object.values(countryData.currencies)[0].symbol})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 " />
            <span>Timezone: {countryData.timezones[0]}</span>
          </div>
        </div>
        <div className="mt-4">
          <a
            href={countryData.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;

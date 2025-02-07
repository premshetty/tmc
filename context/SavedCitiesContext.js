import { createContext, useContext, useEffect, useState } from "react";

const SavedCitiesContext = createContext(undefined);

export const SavedCitiesProvider = ({ children }) => {
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedCities");
    if (saved) setSavedCities(JSON.parse(saved));
  }, []);

  const addCity = (city) => {
    if (!savedCities.find((c) => c.city === city.city)) {
      const updated = [...savedCities, city];
      setSavedCities(updated);
      localStorage.setItem("savedCities", JSON.stringify(updated));
    }
  };

  const removeCity = (cityName) => {
    const updated = savedCities.filter((c) => c.city !== cityName);
    setSavedCities(updated);
    localStorage.setItem("savedCities", JSON.stringify(updated));
  };

  const isCitySaved = (cityName) => {
    return savedCities.some((c) => c.city === cityName);
  };

  return (
    <SavedCitiesContext.Provider
      value={{ savedCities, addCity, removeCity, isCitySaved }}
    >
      {children}
    </SavedCitiesContext.Provider>
  );
};

export const useSavedCities = () => {
  const context = useContext(SavedCitiesContext);
  if (!context) {
    throw new Error("useSavedCities must be used within a SavedCitiesProvider");
  }
  return context;
};

export default SavedCitiesContext;

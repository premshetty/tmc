import { useContext } from "react";
import SavedCitiesContext from "../context/SavedCitiesContext"; // Adjust the path as needed

export const useSavedCities = () => {
  const context = useContext(SavedCitiesContext);
  if (!context) {
    throw new Error("useSavedCities must be used within a SavedCitiesProvider");
  }
  return context;
};

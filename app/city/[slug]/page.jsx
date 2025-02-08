import CityComponent from "@/components/cityComponent";
import axios from "axios";
export async function generateMetadata({ params, searchParams }) {
  const cityName = params.slug;

  // Fetch city image from Wikipedia API
  const fetchCityImage = async (query) => {
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
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image for:", query, error);
      return null;
    }
  };

  const cityImage = await fetchCityImage(cityName);

  return {
    title: `${cityName} - Explore the City`,
    description: `Discover the attractions, weather, and more about ${cityName}.`,
    openGraph: {
      title: `${cityName} - Explore the City`,
      description: `Discover the attractions, weather, and more about ${cityName}.`,
      images: cityImage ? [{ url: cityImage, alt: `${cityName} image` }] : [],
    },
  };
}

export default function CityPage({ params }) {
  const cityName = params.slug;

  if (!cityName) {
    notFound();
  }

  return <CityComponent />;
}

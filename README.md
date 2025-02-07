This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Environment Variables

This file contains the required environment variables for the project.

## Required Variables

### OpenWeather API Key
- **Variable Name:** `OPENWEATHER_API_KEY` and `FOURSQUARE_API_KEY`
- **Description:** API key for fetching weather data and places data.
- **Example:**
  ```env
  OPENWEATHER_API_KEY=your_api_key_here
  FOURSQUARE_API_KEY=your_api_key_here
    ```
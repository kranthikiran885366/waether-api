
# Weather Dashboard (Public API Integration)

## Description
This project is a full-stack Weather Dashboard that integrates with the public OpenWeather API. The backend (Node.js/Express) fetches live weather data for any city and exposes it via a REST API. The frontend (React + Vite) displays weather information using modern, polished cards and weather icons.

## Features
- **Backend:**
	- Calls the OpenWeather API using your API key (India-specific key recommended).
	- Returns weather info (city, country, temperature, humidity, description, icon) via `/api/weather?city=CityName`.
	- Handles errors and CORS for local development.
- **Frontend:**
	- React app displays weather data in stylish cards with icons and gradients.
	- Responsive, modern UI/UX with separate CSS for easy customization.
	- Search for any city and view live weather details.

## Quick Start

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set your `OPENWEATHER_API_KEY` (get one from https://openweathermap.org/api)
3. `npm install`
4. `npm start` (runs on port 4000)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

> **Note:** Make sure the backend is running on port 4000. The frontend will call `/api/weather` for weather data. You can set up a proxy in Vite config if needed.

## API Example
Request:
```
GET http://localhost:4000/api/weather?city=Mumbai
```
Response:
```
{
	"city": "Mumbai",
	"country": "IN",
	"temp": 28.99,
	"feels_like": 31.82,
	"humidity": 65,
	"weather": "Haze",
	"description": "haze",
	"icon": "50d"
}
```

## Screenshots
_Add screenshots of your dashboard UI here!_

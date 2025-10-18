const express = require('express')
const cors = require('cors')
require('dotenv').config()

async function main() {
  // node-fetch v3 is an ES module; import it dynamically from CommonJS
  const { default: fetch } = await import('node-fetch')

  const app = express()
  app.use(cors())
  app.use(express.json())

  const API_KEY = process.env.OPENWEATHER_API_KEY || ''
  console.log('API Key (first 4 chars):', API_KEY.substring(0, 4))

  app.get('/api/weather', async (req, res) => {
    const city = req.query.city
    const lat = req.query.lat
    const lon = req.query.lon
    let url
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    } else {
      return res.status(400).json({ error: 'city or lat/lon query required' })
    }
    try {
      const r = await fetch(url)
      if (!r.ok) {
        const text = await r.text()
        console.error('OpenWeather API error:', text)
        return res.status(r.status).json({ error: text })
      }
      const data = await r.json()
      const out = {
        city: data.name,
        country: data.sys && data.sys.country,
        temp: data.main && data.main.temp,
        feels_like: data.main && data.main.feels_like,
        humidity: data.main && data.main.humidity,
        weather: data.weather && data.weather[0] && data.weather[0].main,
        description: data.weather && data.weather[0] && data.weather[0].description,
        icon: data.weather && data.weather[0] && data.weather[0].icon,
        wind: data.wind && data.wind.speed,
        pressure: data.main && data.main.pressure,
        sunrise: data.sys && data.sys.sunrise,
        sunset: data.sys && data.sys.sunset
      }
      res.json(out)
    } catch (e) {
      console.error('Backend error:', e)
      res.status(500).json({ error: String(e) })
    }
  })

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => console.log('Server running on', PORT))
}

main().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
